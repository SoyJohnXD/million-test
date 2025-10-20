'use client';

import Image from 'next/image';
import { OwnerDetail } from '@/entities/owner/model';
import { useState } from 'react';
import { Input, Button } from '@/shared/ui';

interface OwnerCardProps {
  owner: OwnerDetail;
}

export function OwnerCard({ owner }: OwnerCardProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Contact form submitted');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="">
      <h3 className="text-text-muted mb-3 text-xs font-semibold tracking-wider uppercase">
        Listed By
      </h3>
      <div className="flex items-center space-x-4">
        <Image
          src={owner.photo || 'https://via.placeholder.com/64'}
          alt={`Photo of ${owner.name}`}
          width={64}
          height={64}
          className="bg-accent/30 rounded-full"
        />
        <div className="flex-1">
          <p className="text-text-primary font-semibold">{owner.name}</p>
          <p className="text-text-muted mt-1 text-sm">{owner.address}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <div>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Enter your message"
            className="border-border bg-background text-text-primary placeholder:text-text-muted focus-visible:ring-primary/50 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
          />
        </div>
        <Button variant="primary" className="mt-4 w-full">
          Contact Agent
        </Button>
      </form>
    </div>
  );
}
