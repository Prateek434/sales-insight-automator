import UploadForm from "../components/UploadForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Sales Insight Automator
          </h1>
          <p className="mt-2 text-slate-400">
            Upload your sales data and receive an AI-powered executive summary
            via email.
          </p>
        </div>
        <UploadForm />
      </div>
    </main>
  );
}
