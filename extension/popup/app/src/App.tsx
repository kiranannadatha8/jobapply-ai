import { useEffect, useState } from "react";

type JobData = {
  url?: string;
  title?: string;
  company?: string;
  location?: string;
};

type Profile = {
  name: string;
  email: string;
  linkedin: string;
  github: string;
};

export default function App() {
  const [jd, setJD] = useState<JobData>({});
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    linkedin: "",
    github: "",
  });

  // useEffect(() => {
  //   chrome.storage.sync.get("profile", ({ profile }) => {
  //     if (profile) setProfile(profile);
  //   });
  // }, []);

  const extractJD = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const jd = await chrome.tabs.sendMessage(tab.id!, { type: "EXTRACT_JD" });
    setJD(jd);
  };

  const saveProfile = () => {
    chrome.storage.sync.set({ profile }, () => {
      alert("Profile saved!");
    });
  };

  return (
    <div className="p-4 w-80 text-sm font-sans">
      <h1 className="text-lg font-bold mb-2 text-blue-600">JobApply AI</h1>

      <button
        onClick={extractJD}
        className="w-full py-2 px-3 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Extract Job Description
      </button>

      <div className="mb-4">
        <h2 className="text-md font-semibold mb-1">Job Info</h2>
        <div className="bg-gray-100 p-2 rounded-md h-28 overflow-auto text-xs">
          {jd.title ? (
            <div>
              <p>
                <b>Title:</b> {jd.title}
              </p>
              <p>
                <b>Company:</b> {jd.company}
              </p>
              <p>
                <b>Location:</b> {jd.location}
              </p>
              <p className="truncate">
                <b>URL:</b> {jd.url}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No job data yet</p>
          )}
        </div>
      </div>

      <h2 className="text-md font-semibold mb-1">Profile</h2>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Full Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="url"
          placeholder="LinkedIn"
          value={profile.linkedin}
          onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
          className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="url"
          placeholder="GitHub"
          value={profile.github}
          onChange={(e) => setProfile({ ...profile, github: e.target.value })}
          className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={saveProfile}
          className="w-full py-2 px-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
