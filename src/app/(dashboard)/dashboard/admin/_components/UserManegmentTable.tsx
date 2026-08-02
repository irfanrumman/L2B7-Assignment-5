"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { AdminUserListItem } from "@/lib/types";
import { toggleUserStatusAction } from "../_actions/adminUserAction";

interface Props {
  users: AdminUserListItem[];
}

export function UserManagementTable({ users }: Props) {
  const [isPending, startTransition] = useTransition();
  const [selectedUser, setSelectedUser] = useState<AdminUserListItem | null>(null);

  const openConfirmDialog = (user: AdminUserListItem) => {
    setSelectedUser(user);
  };

  const closeDialog = () => {
    setSelectedUser(null);
  };

  const handleConfirm = () => {
    if (!selectedUser) return;

    const newStatus = selectedUser.status === "ACTIVE" ? "BANNED" : "ACTIVE";

    startTransition(async () => {
      const result = await toggleUserStatusAction(selectedUser.id, newStatus);
      if (result.success) {
        toast.success(result.message || `User ${newStatus === "BANNED" ? "banned" : "unbanned"}`);
      } else {
        toast.error(result.message || "Failed to update user");
      }
      closeDialog();
    });
  };

  const isBanning = selectedUser?.status === "ACTIVE";

  const ActionButton = ({ user }: { user: AdminUserListItem }) =>
    user.role !== "ADMIN" ? (
      <Button
        size="sm"
        variant={user.status === "ACTIVE" ? "destructive" : "secondary"}
        onClick={() => openConfirmDialog(user)}
      >
        {user.status === "ACTIVE" ? "Ban" : "Unban"}
      </Button>
    ) : null;

  return (
    <>
      {/* Mobile — Card layout, sm er nichey */}
      <div className="space-y-3 sm:hidden">
        {users.map((user) => (
          <div key={user.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              {user.status === "ACTIVE" ? (
                <Badge className="bg-green-600 text-white hover:bg-green-600 shrink-0">Active</Badge>
              ) : (
                <Badge variant="destructive" className="shrink-0">Banned</Badge>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span className="capitalize">{user.role.toLowerCase()}</span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>

            {user.role !== "ADMIN" && (
              <div className="mt-3">
                <ActionButton user={user} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop — Table layout, sm er upore */}
      <div className="hidden overflow-x-auto rounded-lg border border-border sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left font-semibold text-foreground p-3">Name</th>
              <th className="text-left font-semibold text-foreground p-3">Role</th>
              <th className="text-left font-semibold text-foreground p-3">Status</th>
              <th className="text-left font-semibold text-foreground p-3">Joined</th>
              <th className="text-left font-semibold text-foreground p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-b-0 hover:bg-muted/20">
                <td className="p-3">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </td>
                <td className="p-3 text-foreground capitalize">{user.role.toLowerCase()}</td>
                <td className="p-3">
                  {user.status === "ACTIVE" ? (
                    <Badge className="bg-green-600 text-white hover:bg-green-600">Active</Badge>
                  ) : (
                    <Badge variant="destructive">Banned</Badge>
                  )}
                </td>
                <td className="p-3 text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <ActionButton user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Dialog — dutoi layout share kore */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isBanning ? "Ban" : "Unban"} {selectedUser?.name}?
            </DialogTitle>
            <DialogDescription>
              {isBanning
                ? "They will lose access to the platform immediately. You can unban them later if needed."
                : "They will regain full access to the platform."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog} disabled={isPending}>
              Cancel
            </Button>
            <Button
              variant={isBanning ? "destructive" : "default"}
              onClick={handleConfirm}
              disabled={isPending}
            >
              {isPending ? "Processing..." : isBanning ? "Ban User" : "Unban User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}