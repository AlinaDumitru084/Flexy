
function Feature({ title, description }: { title: string; description: string }) {
  return (
    
    <div className="border border-gray-800 p-4 rounded-lg">
      {}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      {}
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