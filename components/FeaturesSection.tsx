// components/FeaturesSection.tsx

// A helper component for each feature item
function Feature({ title, description }: { title: string; description: string }) {
  return (
    // --- MODIFIED: Padding is now smaller (p-4) ---
    <div className="border border-gray-800 p-4 rounded-lg">
      {/* --- MODIFIED: Title is now smaller (text-lg) --- */}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      {/* --- MODIFIED: Description is now smaller (text-sm) --- */}
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="container mx-auto py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <Feature
          title="Advanced AI Insights"
          description="Leverage AI to understand your fitness progress deeply and make data-driven improvements."
        />
        <Feature
          title="Dynamic Progress Tracking"
          description="Track every step of your journey and see your growth over time with detailed metrics."
        />
        <Feature
          title="Personalized Goal Setting"
          description="Set achievable fitness goals and let our AI guide you towards surpassing them."
        />
      </div>
    </section>
  );
}