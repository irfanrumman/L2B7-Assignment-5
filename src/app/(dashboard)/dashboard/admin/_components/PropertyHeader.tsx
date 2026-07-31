type Props = {
  total: number;
};

export default function PropertyHeader({ total }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-foreground mb-2">
        Browse Properties
      </h1>

      <p className="text-lg text-muted-foreground">
        Showing {total} available rentals
      </p>
    </div>
  );
}