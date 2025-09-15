import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: string;
  experience?: string;
  skills?: string;
  linkedin?: string;
  github?: string;
};

export function Onboarding() {
  const [step, setStep] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    experience: "",
    skills: "",
    linkedin: "",
    github: "",
  });

  const handleUpload = () => {
    if (!resumeFile) return;
    // 🔗 TODO: send resumeFile to backend AI parser
    // Mock extracted data for now
    setProfile({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@email.com",
      phone: "123-456-7890",
      linkedin: "https://linkedin.com/in/janedoe",
      github: "https://github.com/janedoe",
    });
    setStep(1);
    setSubStep(0);
  };

  const handleSave = () => {
    chrome.storage.sync.set({ profile }, () => {
      setStep(2);
    });
  };

  return (
    <Card className="w-80 p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {step === 0 && "Welcome to JobApply AI 🎉"}
          {step === 1 && "Review Your Profile"}
          {step === 2 && "All Set!"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(step / 2) * 100} className="mb-4" />

        {step === 0 && (
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Upload your resume and we’ll automatically extract your details.
            </p>
            <div className="space-y-1.5">
              <label
                htmlFor="resume"
                className="text-sm font-medium leading-none"
              >
                Upload Resume
              </label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.docx,.tex"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              />
            </div>
            <Button
              className="w-full"
              disabled={!resumeFile}
              onClick={handleUpload}
            >
              Upload & Continue
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                {subStep === 0
                  ? "Basic Information"
                  : "Education, Experience, Skills"}
              </div>
              <div
                className="flex items-center gap-1.5"
                aria-label="profile sub-steps"
              >
                <span
                  className={`h-1.5 w-6 rounded-full ${
                    subStep === 0 ? "bg-primary" : "bg-muted"
                  }`}
                />
                <span
                  className={`h-1.5 w-6 rounded-full ${
                    subStep === 1 ? "bg-primary" : "bg-muted"
                  }`}
                />
              </div>
            </div>

            {subStep === 0 && (
              <>
                <div className="space-y-1.5">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium leading-none"
                  >
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    value={profile.firstName}
                    onChange={(e) =>
                      setProfile({ ...profile, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium leading-none"
                  >
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    value={profile.lastName}
                    onChange={(e) =>
                      setProfile({ ...profile, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium leading-none"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    placeholder="Phone"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="address"
                    className="text-sm font-medium leading-none"
                  >
                    Address
                  </label>
                  <Input
                    id="address"
                    placeholder="Address"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <Button className="ml-auto" onClick={() => setSubStep(1)}>
                    Next
                  </Button>
                </div>
              </>
            )}

            {subStep === 1 && (
              <>
                <div className="space-y-1.5">
                  <label
                    htmlFor="education"
                    className="text-sm font-medium leading-none"
                  >
                    Education
                  </label>
                  <textarea
                    id="education"
                    placeholder="Schools, degrees, years"
                    value={profile.education}
                    onChange={(e) =>
                      setProfile({ ...profile, education: e.target.value })
                    }
                    className="min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="experience"
                    className="text-sm font-medium leading-none"
                  >
                    Experience
                  </label>
                  <textarea
                    id="experience"
                    placeholder="Companies, roles, responsibilities"
                    value={profile.experience}
                    onChange={(e) =>
                      setProfile({ ...profile, experience: e.target.value })
                    }
                    className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="skills"
                    className="text-sm font-medium leading-none"
                  >
                    Skills
                  </label>
                  <Input
                    id="skills"
                    placeholder="e.g., JavaScript, React, Node.js"
                    value={profile.skills}
                    onChange={(e) =>
                      setProfile({ ...profile, skills: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="linkedin"
                    className="text-sm font-medium leading-none"
                  >
                    LinkedIn
                  </label>
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="LinkedIn profile URL"
                    value={profile.linkedin}
                    onChange={(e) =>
                      setProfile({ ...profile, linkedin: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="github"
                    className="text-sm font-medium leading-none"
                  >
                    GitHub
                  </label>
                  <Input
                    id="github"
                    type="url"
                    placeholder="GitHub profile URL"
                    value={profile.github}
                    onChange={(e) =>
                      setProfile({ ...profile, github: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <Button onClick={() => setSubStep(0)}>Back</Button>
                  <Button className="ml-auto" onClick={handleSave}>
                    Confirm & Save
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-3">
            <p className="text-green-600 font-medium">
              🎯 Your profile is ready!
            </p>
            <p className="text-gray-500 text-sm">
              You can now auto-fill applications with one click.
            </p>
            <Button className="w-full" onClick={() => setStep(0)}>
              Restart Onboarding
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
