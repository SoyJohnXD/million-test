interface PropertyDescriptionProps {
  description: string;
}

export function PropertyDescription({ description }: PropertyDescriptionProps) {
  return (
    <div>
      <h2 className="font-heading text-text-primary mb-3 text-xl font-semibold">
        Description
      </h2>
      {/* Use whitespace-pre-line to respect line breaks from the description */}
      <p className="text-text-secondary/90 text-sm leading-relaxed whitespace-pre-line md:text-base">
        {description}
      </p>
    </div>
  );
}
