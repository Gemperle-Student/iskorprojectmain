import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button1";

export const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Help Center</h1>
      <div className="space-y-4 w-full max-w-md">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-2">
          <p><strong>Q: How do I create a new class?</strong></p>
          <p>A: Click the "Create Class" button in the top right corner of the home page.</p>
        </div>
        <div className="space-y-2">
          <p><strong>Q: How can I delete a class?</strong></p>
          <p>A: Click the three dots menu on a class card and select "Delete Class".</p>
        </div>
        <div className="space-y-2">
          <p><strong>Q: Where can I find more help?</strong></p>
          <p>A: Contact our support team at support@example.com</p>
        </div>
      </div>
      <Button className="mt-8" onClick={() => navigate("/")}>Back to Home</Button>
    </div>
  );
};
