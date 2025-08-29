import { useMemo } from "react";
import {
  Shield,
  FileText,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Download,
} from "lucide-react";
import AdditionalDocuments from "./uploadAdditionaldocuments";

// --- Sample Data ---
const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  nid: "NID-12344567",
  status: "verified",
  verificationProgress: 100,
};

const documents = [
  {
    id: 1,
    name: "Passport",
    type: "Identity Document",
    status: "verified",
    uploadDate: "2024-01-15",
    verifiedDate: "2024-01-16",
  },
  {
    id: 2,
    name: "Utility Bill",
    type: "Address Proof",
    status: "verified",
    uploadDate: "2024-01-15",
    verifiedDate: "2024-01-16",
  },
  {
    id: 3,
    name: "Bank Statement",
    type: "Financial Document",
    status: "pending",
    uploadDate: "2024-01-20",
    verifiedDate: null,
  },
];

// --- Helpers ---
const StatusBadge = ({ status }) => {
  switch (status) {
    case "verified":
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-green-500 text-white">
          Verified
        </span>
      );
    case "pending":
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
          Pending Review
        </span>
      );
    case "rejected":
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-red-500 text-white">
          Rejected
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-600">
          Unknown
        </span>
      );
  }
};

const StatusIcon = ({ status }) => {
  switch (status) {
    case "verified":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "rejected":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-400" />;
  }
};

// --- Main Component ---
const Dashboard = () => {
  const docStats = useMemo(() => {
    const total = documents.length;
    const verified = documents.filter((d) => d.status === "verified").length;
    const pending = documents.filter((d) => d.status === "pending").length;
    return { total, verified, pending };
  }, []);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto mt-24 px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-gray-500">
            Manage your digital identity and verification status
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Verification Status"
            icon={<Shield className="h-4 w-4 text-gray-500" />}
            value="Verified"
            subtitle="Identity confirmed"
            valueClass="text-green-600"
          />

          <StatCard
            title="Documents"
            icon={<FileText className="h-4 w-4 text-gray-500" />}
            value={docStats.total}
            subtitle={`${docStats.verified} verified, ${docStats.pending} pending`}
          />

          <StatCard
            title="NID Number"
            icon={<User className="h-4 w-4 text-gray-500" />}
            value={userProfile.nid}
            subtitle="Unique identifier"
            mono
          />
        </div>

        {/* Profile */}
        <SectionCard
          title="Personal Information"
          desc="Your verified identity details"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Info label="Full Name" value={userProfile.name} />
            <Info label="Email Address" value={userProfile.email} />
            <Info label="Phone Number" value={userProfile.phone} />
            <Info label="NID Number" value={userProfile.nid} mono />
          </div>
        </SectionCard>

        {/* Documents */}
        <SectionCard
          title="Uploaded Documents"
          desc="Manage your identity verification documents"
        >
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex justify-between items-center p-4 border rounded-lg bg-white"
              >
                <div className="flex items-center space-x-4">
                  <StatusIcon status={doc.status} />
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-gray-500">{doc.type}</p>
                    <p className="text-xs text-gray-400">
                      Uploaded: {doc.uploadDate}
                      {doc.verifiedDate && ` • Verified: ${doc.verifiedDate}`}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <StatusBadge status={doc.status} />
                  <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 flex items-center">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </button>
                  <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 flex items-center">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="mt-6">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              Upload Additional Documents
            </button>
          </div> */}
          <div className="mt-6">    
            <AdditionalDocuments />
          </div>
        </SectionCard>

        {/* Activity */}
        <SectionCard
          title="Recent Activity"
          desc="Your account activity and verification history"
        >
          <Activity
            icon={<CheckCircle className="h-5 w-5 text-green-500" />}
            title="Identity Verification Completed"
            desc="Your identity has been successfully verified."
            date="January 16, 2024 at 2:30 PM"
          />
          <Activity
            icon={<FileText className="h-5 w-5 text-blue-500" />}
            title="Documents Uploaded"
            desc="Passport and utility bill uploaded for verification."
            date="January 15, 2024 at 10:15 AM"
          />
          <Activity
            icon={<User className="h-5 w-5 text-blue-500" />}
            title="Account Created"
            desc="Welcome to e-KYC Pro! Your account has been created."
            date="January 15, 2024 at 9:45 AM"
          />
        </SectionCard>
      </main>
    </div>
  );
};

// --- Reusable components ---
const StatCard = ({ title, icon, value, subtitle, valueClass, mono }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-medium">{title}</h3>
      {icon}
    </div>
    <div
      className={`text-2xl font-bold ${valueClass || ""} ${
        mono ? "font-mono" : ""
      }`}
    >
      {value}
    </div>
    <p className="text-xs text-gray-500">{subtitle}</p>
  </div>
);

const SectionCard = ({ title, desc, children }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-8">
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    {desc && <p className="text-sm text-gray-500 mb-4">{desc}</p>}
    {children}
  </div>
);

const Info = ({ label, value, mono }) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <p className={`text-lg font-medium ${mono ? "font-mono" : ""}`}>{value}</p>
  </div>
);

const Activity = ({ icon, title, desc, date }) => (
  <div className="flex space-x-4 p-4 border rounded-lg bg-gray-50 mb-3">
    {icon}
    <div className="flex-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500">{desc}</p>
      <p className="text-xs text-gray-400 mt-1">{date}</p>
    </div>
  </div>
);

export default Dashboard;
