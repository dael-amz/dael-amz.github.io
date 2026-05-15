import React from "react";

const research = [
  {
    title: "Effective Results in Homogeneous Dynamics",
    institution: "Hebrew University Math REU",
    date: "Summer 2024",
    advisor: "Prof. Elon Lindenstrauss",
  },
  {
    title: "Billiard Complexity for Certain Rational Right and Isoceles Triangles",
    institution: "University of Chicago Math REU",
    date: "Summer 2025",
    advisor: "Prof. Howard Masur",
  },
  {
    title: "Hybridizing Traditional and Next-Generation Reservoir Computing to Accurately and Efficiently Forecast Dynamical Systems",
    institution: "TREND REU",
    date: "Summer 2023",
    advisor: "Michelle Girvan and Thomas Antonsen",
    link: "https://github.com/ravi-chepuri/hybrid_RC_NGRC",
  },
];

const projects = [
  {
    title: "Layerwise Probing of Accent Representations in Qwen2Audio",
  },
  {
    title: "Robust SIFT for Dynamic Underwater Images",
    link: "https://github.com/dael-amz/vision-project",
  },
  {
    title: "Reinforcement Learning Robot Dance Battle",
  },
  {
    title: "Distributed Raft Database",
  },
];

const teaching = [
  {
    role: "President, UChicago Math Club",
    date: "2024–present",
  },
  {
    role: "Mentor / Instructor, Chicago Math Circles",
    date: "2024–present",
  },
];

const links = [
  { label: "GitHub", href: "https://github.com/dael-amz" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dael-amzalag-485918253/" },
];

function runSiteDataTests() {
  const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

  const isValidUrl = (value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "mailto:";
    } catch {
      return false;
    }
  };

  const tests = [
    {
      name: "research section has entries",
      pass: Array.isArray(research) && research.length >= 3,
    },
    {
      name: "research entries have required fields",
      pass: research.every(
        (item) =>
          isNonEmptyString(item.title) &&
          isNonEmptyString(item.institution) &&
          isNonEmptyString(item.date)
      ),
    },
    {
      name: "projects section has entries",
      pass: Array.isArray(projects) && projects.length >= 3,
    },
    {
      name: "project entries have titles",
      pass: projects.every((item) => isNonEmptyString(item.title)),
    },
    {
      name: "links are valid URLs",
      pass: [...links, ...projects, ...research].every((item) =>
        isValidUrl(item.href || item.link)
      ),
    },
  ];

  if (typeof console !== "undefined") {
    tests.forEach((test) => {
      if (!test.pass) console.warn(`Site data test failed: ${test.name}`);
    });
  }

  return tests;
}

const siteDataTests = runSiteDataTests();

function Section({ id, title, children }) {
  return (
    <section id={id} className="mb-10">
      <h2 className="mb-3 border-b border-stone-300 pb-1 text-xl font-normal text-neutral-900">
        <span className="mr-2 text-stone-400">∗</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function ExternalLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900"
    >
      {children}
    </a>
  );
}


function ResearchItem({ item }) {
  return (
    <article className="mb-4">
      <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
      <p className="text-sm text-neutral-600">
        {item.institution}, {item.date}
        {item.advisor ? ` · Advisor: ${item.advisor}` : ""}
        {item.link ? (
          <>
            {" · "}
            <ExternalLink href={item.link}>link</ExternalLink>
          </>
        ) : null}
      </p>
    </article>
  );
}

function ProjectItem({ item }) {
  return (
    <article className="mb-3">
      <h3 className="text-base font-semibold text-neutral-900">
        {item.link ? <ExternalLink href={item.link}>{item.title}</ExternalLink> : item.title}
      </h3>
    </article>
  );
}

function TeachingItem({ item }) {
  return (
    <article className="mb-4">
      <h3 className="text-base font-semibold text-neutral-900">{item.role}</h3>
      <p className="text-sm text-neutral-600">{item.date}</p>
    </article>
  );
}

export default function PersonalWebsite() {
  const failedTests = siteDataTests.filter((test) => !test.pass);

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-5 py-8 text-neutral-900">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(#1c1917 1px, transparent 1px), linear-gradient(90deg, #1c1917 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        {failedTests.length > 0 && (
          <div className="mb-6 border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            Site data warning: {failedTests.map((test) => test.name).join(", ")}
          </div>
        )}

        <header className="mb-10 border-b border-neutral-300 pb-6">
          <h1 className="text-3xl font-normal tracking-tight text-neutral-950">
            Dael Amzalag
          </h1>

          <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href="#about" className="text-blue-700 hover:text-blue-900">
              About
            </a>
            <a href="#research" className="text-blue-700 hover:text-blue-900">
              Research
            </a>
            <a href="#projects" className="text-blue-700 hover:text-blue-900">
              Projects
            </a>
            <a href="#teaching" className="text-blue-700 hover:text-blue-900">
              Teaching
            </a>
            <a href="#contact" className="text-blue-700 hover:text-blue-900">
              Contact
            </a>
          </nav>
        </header>

        <Section id="about" title="About">
          <p className="mt-3 leading-7 text-neutral-800">
            I am a fourth-year math and CS major at the University of Chicago. Next year I will start the math PhD program at Princeton.
          </p>
          <p className="leading-7 text-neutral-800">
            I am interested in dynamics and its applications to number theory and geometry. I also enjoy machine learning, especially when when applied to systems with exploitable structure like vision, audio processing, and dynamics.
          </p>

          <p className="mt-3 leading-7 text-neutral-800">
            In my free time I play classical guitar.
          </p>
        </Section>

        <Section id="research" title="Research">
          {research.map((item) => (
            <ResearchItem key={item.title} item={item} />
          ))}
        </Section>

        <Section id="projects" title="Selected CS Projects">
          {projects.map((item) => (
            <ProjectItem key={item.title} item={item} />
          ))}
        </Section>

        <Section id="teaching" title="Teaching and Service">
          {teaching.map((item) => (
            <TeachingItem key={item.role} item={item} />
          ))}
        </Section>

        <Section id="contact" title="Contact">
          <ul className="list-disc space-y-1 pl-5 text-neutral-800">
            {links.map((link) => (
              <li key={link.label}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>

        </Section>
      </div>
    </main>
  );
}