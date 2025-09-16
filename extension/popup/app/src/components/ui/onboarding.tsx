import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type Profile = {
  basics: {
    firstName: string;
    lastName: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    linkedin?: string | null;
    github?: string | null;
    website?: string | null;
  };
  education: Array<{
    school: string;
    degree?: string | null;
    start?: string | null;
    end?: string | null;
  }>;
  experience: Array<{
    company: string;
    title?: string | null;
    start?: string | null;
    end?: string | null;
    bullets: string[];
  }>;
  projects: Array<{
    name: string;
    description?: string | null;
    skills: string[];
  }>;
  skills: string[];
};

export function Onboarding() {
  const [step, setStep] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<Profile>({
    basics: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      website: "",
    },
    education: [],
    experience: [],
    projects: [],
    skills: [],
  });

  const handleUpload = async () => {
    if (!resumeFile) return;
    //dummy data to mock the profile
    setProfile({
      basics: {
        firstName: "John",
        lastName: "Doe",
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        github: "",
        website: "",
      },
      education: [
        {
          school: "University of Example",
          degree: "B.Sc. in Computer Science",
          start: "2018",
          end: "2022",
        },
      ],
      experience: [
        {
          company: "Tech Solutions Inc.",
          title: "Software Engineer",
          start: "2022-06",
          end: "Present",
          bullets: [
            "Developed and maintained web applications using React and Node.js.",
            "Collaborated with cross-functional teams to define project requirements.",
          ],
        },
      ],
      projects: [
        {
          name: "Personal Portfolio",
          description: "A personal website to showcase my projects and skills.",
          skills: ["React", "CSS", "JavaScript"],
        },
      ],
      skills: ["JavaScript", "React", "Node.js", "CSS"],
    });
    // const form = new FormData();
    // form.append("file", resumeFile);
    // const response = await fetch("http://localhost:8080/api/parse-resume", {
    //   method: "POST",
    //   body: form,
    // });
    // if (!response.ok) {
    //   console.error("Failed to upload resume");
    //   return;
    // }
    // const data = await response.json();
    // if (data?.profile) {
    //   setProfile(data.profile as Profile);
    // }
    setStep(1);
    setSubStep(0);
  };

  const handleSave = () => {
    chrome.storage.sync.set({ profile }, () => {
      setStep(2);
    });
  };

  return (
    <Card className="w-80 max-h-150 overflow-scroll p-4 ml-5">
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
              <label htmlFor="resume" className="text-sm font-medium">
                Upload Resume
              </label>
              <Input
                className="text-sm"
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
                  : "Education, Experience, Projects, Skills"}
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
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    value={profile.basics.firstName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        basics: {
                          ...profile.basics,
                          firstName: e.target.value,
                        },
                      })
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
                    value={profile.basics.lastName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        basics: { ...profile.basics, lastName: e.target.value },
                      })
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
                    value={profile.basics.email ?? ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        basics: { ...profile.basics, email: e.target.value },
                      })
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
                    value={profile.basics.phone ?? ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        basics: { ...profile.basics, phone: e.target.value },
                      })
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
                    value={profile.basics.address ?? ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        basics: { ...profile.basics, address: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="website"
                    className="text-sm font-medium leading-none"
                  >
                    Website
                  </label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="Personal website URL"
                    value={profile.basics.website ?? ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        basics: { ...profile.basics, website: e.target.value },
                      })
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
                    value={profile.basics.linkedin ?? ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        basics: { ...profile.basics, linkedin: e.target.value },
                      })
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
                    value={profile.basics.github ?? ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        basics: { ...profile.basics, github: e.target.value },
                      })
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
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium leading-none">
                      Education
                    </label>
                    <Button
                      size="sm"
                      onClick={() =>
                        setProfile({
                          ...profile,
                          education: [
                            ...profile.education,
                            { school: "", degree: "", start: "", end: "" },
                          ],
                        })
                      }
                    >
                      Add
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {profile.education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="rounded-md border p-2 space-y-2"
                      >
                        <Input
                          placeholder="School"
                          value={edu.school}
                          onChange={(e) => {
                            const next = [...profile.education];
                            next[idx] = {
                              ...next[idx],
                              school: e.target.value,
                            };
                            setProfile({ ...profile, education: next });
                          }}
                        />
                        <Input
                          placeholder="Degree"
                          value={edu.degree ?? ""}
                          onChange={(e) => {
                            const next = [...profile.education];
                            next[idx] = {
                              ...next[idx],
                              degree: e.target.value,
                            };
                            setProfile({ ...profile, education: next });
                          }}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Start (e.g., 2020)"
                            value={edu.start ?? ""}
                            onChange={(e) => {
                              const next = [...profile.education];
                              next[idx] = {
                                ...next[idx],
                                start: e.target.value,
                              };
                              setProfile({ ...profile, education: next });
                            }}
                          />
                          <Input
                            placeholder="End (e.g., 2024 or Present)"
                            value={edu.end ?? ""}
                            onChange={(e) => {
                              const next = [...profile.education];
                              next[idx] = { ...next[idx], end: e.target.value };
                              setProfile({ ...profile, education: next });
                            }}
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            onClick={() => {
                              const next = profile.education.filter(
                                (_, i) => i !== idx
                              );
                              setProfile({ ...profile, education: next });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium leading-none">
                      Experience
                    </label>
                    <Button
                      size="sm"
                      onClick={() =>
                        setProfile({
                          ...profile,
                          experience: [
                            ...profile.experience,
                            {
                              company: "",
                              title: "",
                              start: "",
                              end: "",
                              bullets: [],
                            },
                          ],
                        })
                      }
                    >
                      Add
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {profile.experience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="rounded-md border p-2 space-y-2"
                      >
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => {
                            const next = [...profile.experience];
                            next[idx] = {
                              ...next[idx],
                              company: e.target.value,
                            };
                            setProfile({ ...profile, experience: next });
                          }}
                        />
                        <Input
                          placeholder="Title"
                          value={exp.title ?? ""}
                          onChange={(e) => {
                            const next = [...profile.experience];
                            next[idx] = { ...next[idx], title: e.target.value };
                            setProfile({ ...profile, experience: next });
                          }}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Start (e.g., 2021-01)"
                            value={exp.start ?? ""}
                            onChange={(e) => {
                              const next = [...profile.experience];
                              next[idx] = {
                                ...next[idx],
                                start: e.target.value,
                              };
                              setProfile({ ...profile, experience: next });
                            }}
                          />
                          <Input
                            placeholder="End (e.g., 2023-08 or Present)"
                            value={exp.end ?? ""}
                            onChange={(e) => {
                              const next = [...profile.experience];
                              next[idx] = { ...next[idx], end: e.target.value };
                              setProfile({ ...profile, experience: next });
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">
                            Bullets (one per line)
                          </label>
                          <textarea
                            placeholder="Accomplishment or responsibility per line"
                            value={(exp.bullets ?? []).join("\n")}
                            onChange={(e) => {
                              const lines = e.target.value
                                .split("\n")
                                .map((s) => s.trim())
                                .filter(Boolean);
                              const next = [...profile.experience];
                              next[idx] = { ...next[idx], bullets: lines };
                              setProfile({ ...profile, experience: next });
                            }}
                            className="min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            onClick={() => {
                              const next = profile.experience.filter(
                                (_, i) => i !== idx
                              );
                              setProfile({ ...profile, experience: next });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium leading-none">
                      Projects
                    </label>
                    <Button
                      size="sm"
                      onClick={() =>
                        setProfile({
                          ...profile,
                          projects: [
                            ...profile.projects,
                            { name: "", description: "", skills: [] },
                          ],
                        })
                      }
                    >
                      Add
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {profile.projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="rounded-md border p-2 space-y-2"
                      >
                        <Input
                          placeholder="Project name"
                          value={proj.name}
                          onChange={(e) => {
                            const next = [...profile.projects];
                            next[idx] = { ...next[idx], name: e.target.value };
                            setProfile({ ...profile, projects: next });
                          }}
                        />
                        <textarea
                          placeholder="Short description"
                          value={proj.description ?? ""}
                          onChange={(e) => {
                            const next = [...profile.projects];
                            next[idx] = {
                              ...next[idx],
                              description: e.target.value,
                            };
                            setProfile({ ...profile, projects: next });
                          }}
                          className="min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        />
                        <Input
                          placeholder="Skills (comma-separated)"
                          value={(proj.skills ?? []).join(", ")}
                          onChange={(e) => {
                            const list = e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean);
                            const next = [...profile.projects];
                            next[idx] = { ...next[idx], skills: list };
                            setProfile({ ...profile, projects: next });
                          }}
                        />
                        <div className="flex justify-end">
                          <Button
                            variant="destructive"
                            onClick={() => {
                              const next = profile.projects.filter(
                                (_, i) => i !== idx
                              );
                              setProfile({ ...profile, projects: next });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-sm font-medium leading-none">
                    Skills
                  </label>
                  <Input
                    id="skills"
                    placeholder="e.g., JavaScript, React, Node.js"
                    value={(profile.skills ?? []).join(", ")}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        skills: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
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
