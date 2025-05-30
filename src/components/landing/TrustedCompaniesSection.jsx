const trustedCompanies = [
  { id: 1, name: "Microsoft", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/microsoft-logo.svg" },
  { id: 2, name: "Walmart", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/walmart-logo.svg" },
  { id: 3, name: "Accenture", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/accenture-logo.svg" },
  { id: 4, name: "Adobe", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/adobe-logo.svg" },
  { id: 5, name: "PayPal", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/paypal-logo.svg" },
];

export const TrustedCompaniesSection = () => {
  return (
    <section className="w-full max-w-[1440px] flex flex-col items-center mb-24">
      <p className="text-[#565656] text-base font-medium text-center mb-10">
        Trusted by learners from
      </p>
      <div className="flex justify-center items-center gap-10">
        {trustedCompanies.map((company) => (
          <img
            key={company.id}
            className="h-[25px] object-contain"
            alt={`${company.name} logo`}
            src={company.logo}
          />
        ))}
      </div>
    </section>
  );
}; 