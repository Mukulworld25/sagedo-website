import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Orders() {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    requirements: "",
  });

  const uploadMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (!response.ok) throw new Error("Upload failed");
      return response.json();
    },
  });

  const orderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      await apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: () => {
      toast({
        title: "Order Submitted Successfully!",
        description: "We'll contact you via email and WhatsApp shortly.",
      });
      setFormData({ name: "", email: "", service: "", requirements: "" });
      setFiles([]);
    },
    onError: (error: Error) => {
      toast({
        title: "Order Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.service) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    let fileUrls: string[] = [];

    if (files.length > 0) {
      const uploadFormData = new FormData();
      files.forEach((file) => {
        uploadFormData.append("files", file);
      });

      try {
        const uploadResult = await uploadMutation.mutateAsync(uploadFormData);
        fileUrls = uploadResult.urls;
      } catch (error) {
        toast({
          title: "File Upload Failed",
          description: "Please try again or proceed without files.",
          variant: "destructive",
        });
        return;
      }
    }

    orderMutation.mutate({
      customerName: formData.name,
      customerEmail: formData.email,
      serviceName: formData.service,
      requirements: formData.requirements,
      fileUrls,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Place Your Order
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Tell us what you need, and we'll get it done for you.
          </p>
        </div>

        <Card className="glass p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Your Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                data-testid="input-name"
                required
                className="glass border-border/50"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                data-testid="input-email"
                required
                className="glass border-border/50"
              />
            </div>

            {/* Service */}
            <div className="space-y-2">
              <Label htmlFor="service" className="text-foreground">
                Service Needed <span className="text-destructive">*</span>
              </Label>
              <Input
                id="service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                placeholder="e.g., AI Ad Copy, Resume, PPT Design"
                data-testid="input-service"
                required
                className="glass border-border/50"
              />
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <Label htmlFor="requirements" className="text-foreground">
                Requirements & Details
              </Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Please describe your requirements in detail..."
                rows={6}
                data-testid="textarea-requirements"
                className="glass border-border/50"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="files" className="text-foreground">
                Upload Files (Optional)
              </Label>
              <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center glass hover-elevate">
                <input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  data-testid="input-files"
                  className="hidden"
                />
                <label
                  htmlFor="files"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <Upload className="w-12 h-12 text-muted-foreground" />
                  <div>
                    <p className="text-foreground font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      PDF, DOC, DOCX, ZIP, Images (Max 10MB each)
                    </p>
                  </div>
                </label>
              </div>
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm text-foreground font-medium">
                    Selected files: ({files.length})
                  </p>
                  <ul className="space-y-1">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={orderMutation.isPending || uploadMutation.isPending}
              data-testid="button-submit-order"
              className="w-full bg-gradient-to-r from-primary to-destructive hover:opacity-90 text-lg py-6"
            >
              {orderMutation.isPending || uploadMutation.isPending
                ? "Submitting..."
                : "Submit Order"}
            </Button>
          </form>
        </Card>

        {/* Alternative: Google Form Embed */}
        <div className="mt-12">
          <Card className="glass p-6">
            <h3 className="text-xl font-bold text-foreground mb-4 text-center">
              Prefer Google Forms?
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              You can also submit your order using our Google Form below:
            </p>
            <div className="w-full overflow-hidden rounded-lg" style={{ height: "800px" }}>
              <iframe
                src="https://docs.google.com/forms/d/e/1bxgiSvqRDDbDP8rOeGJu-ueoafXQ57liO48FzQdN6VY/viewform?embedded=true"
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="SAGEDO AI Order Form"
                data-testid="iframe-google-form"
              >
                Loading…
              </iframe>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
