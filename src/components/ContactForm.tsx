"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ContactForm({ isEn }: { isEn: boolean }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const res = await submitContactForm(formData);
    
    if (res.error) {
      setError(res.error);
    } else if (res.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    }
    
    setLoading(false);
  }

  if (success) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-6 rounded-xl border border-green-200 dark:border-green-800 flex flex-col items-center justify-center text-center">
        <CheckCircle2 className="w-12 h-12 mb-4" />
        <h3 className="text-xl font-semibold mb-2">{isEn ? "Message Sent!" : "تم إرسال الرسالة!"}</h3>
        <p>{isEn ? "We'll get back to you as soon as possible." : "سنرد عليك في أقرب وقت ممكن."}</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm underline"
        >
          {isEn ? "Send another message" : "إرسال رسالة أخرى"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-8 max-w-md bg-card p-6 rounded-xl border shadow-sm">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          {isEn ? "Name" : "الاسم"}
        </label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {isEn ? "Email" : "البريد الإلكتروني"}
        </label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          {isEn ? "Message" : "الرسالة"}
        </label>
        <textarea 
          id="message" 
          name="message" 
          rows={4} 
          required 
          className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 flex justify-center items-center gap-2 disabled:opacity-70"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isEn ? "Send Message" : "إرسال الرسالة"}
      </button>
    </form>
  );
}