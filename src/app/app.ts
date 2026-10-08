import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  NgZone,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  type LayoutNode,
  type LayoutResult,
  type SkillLevel,
  layoutSkillGraph,
} from './skill-layout';

type WorkStatus = 'in-progress' | 'shipped' | 'prototype';

interface Tech {
  name: string;
  /** Slug from https://simpleicons.org, used to load the monochrome icon. */
  slug: string;
}

interface CareerItem {
  type: 'career';
  date: string;
  title: string;
  role: string;
  description?: string;
}

interface ProjectItem {
  type: 'project';
  date: string;
  name: string;
  description: string;
  status: WorkStatus;
  stack: Tech[];
  /** External link to the project. Omit it and the "Visit project" link is hidden. */
  url?: string;
}

type WorkItem = CareerItem | ProjectItem;

interface Skill extends Tech {
  /** core = center of the graph, proficient = inner ring, familiar = outer ring. */
  level: SkillLevel;
  /** Groups the skills around the graph (and on mobile). */
  category: string;
}

interface GraphNode extends LayoutNode {
  skill?: Skill;
}

type SkillState = 'idle' | 'dim' | 'related' | 'active';

type ContactIcon = 'github' | 'linkedin' | 'mail';

interface ContactLink {
  label: string;
  /** Text shown under the label. */
  value: string;
  /** https:// links open in a new tab, mailto: links open the mail app. */
  href: string;
  icon: ContactIcon;
}

type ContactStatus = 'idle' | 'sending' | 'sent' | 'error';

const CONTACT_ENDPOINT = 'https://formspree.io/f/mgokpkyd';

/** Pill styles per level. If you change sizes here, update PILL in skill-layout.ts too. */
const LEVEL_CLASS: Record<SkillLevel, string> = {
  core: 'px-4 py-2 text-base border-accent/60 bg-accent/15 text-secondary shadow-[0_0_30px_rgba(47,21,244,0.35)]',
  proficient: 'px-3.5 py-1.5 text-sm border-secondary/20 bg-secondary/[0.04] text-secondary/90',
  familiar: 'px-3 py-1 text-xs border-secondary/10 text-secondary/60',
};

const ICON_CLASS: Record<SkillLevel, string> = {
  core: 'size-6',
  proficient: 'size-5',
  familiar: 'size-4',
};

const STATE_CLASS: Record<SkillState, string> = {
  idle: '',
  dim: 'opacity-25',
  related: 'border-accent/50!',
  active: 'border-accent! bg-accent/25! scale-110 z-10',
};

@Component({
  imports: [NgTemplateOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements AfterViewInit {
  protected readonly title = signal('portfolio');
  private readonly follower = viewChild.required<ElementRef<HTMLDivElement>>('cursorFollower');
  private readonly pinWrapper = viewChild.required<ElementRef<HTMLDivElement>>('pinWrapper');

  /** Hero pin has 3 panels: H1 intro, desktop mockup, mobile mockup. */
  private readonly panelCount = 3;

  protected readonly activeIndex = signal(0);

  /** 0 → 1 while the Work section slides over the pinned hero. */
  protected readonly coverProgress = signal(0);

  /** Hero content drifts up, shrinks and dims as the Work section covers it (parallax). */
  protected readonly heroTransform = computed(() => {
    const p = this.coverProgress();
    return `translate3d(0, ${-p * 15}dvh, 0) scale(${1 - p * 0.06})`;
  });
  protected readonly heroOpacity = computed(() => 1 - this.coverProgress() * 0.7);

  protected readonly statusLabel: Record<WorkStatus, string> = {
    'in-progress': 'In progress',
    shipped: 'Shipped',
    prototype: 'Prototype',
  };

  protected readonly workItems: WorkItem[] = [
    {
      type: 'project',
      date: 'september 2020',
      name: 'MindLab',
      description:
        'Thesis project: a web platform that enables students and teachers to take part in online courses, with real-time video calls and chat, Stripe payments, and more. It was my first hands-on experience with TypeScript and Angular.',
      status: 'prototype',
      stack: [
        { name: 'Angular', slug: 'angular' },
        { name: 'Express', slug: 'express' },
        { name: 'MongoDB', slug: 'mongodb' },
        { name: 'Socket.io', slug: 'socket.io' },
        { name: 'TypeScript', slug: 'typescript' },
      ],
    },
    {
      type: 'career',
      date: 'october 2020',
      title: 'JavaScript Fullstack certification',
      role: 'RBK Tunisia',
      description:
        'Learned the fundamental technical skills as well as the soft skills and the importance of teamwork in a professional environment.',
    },
    {
      type: 'project',
      date: 'january 2021',
      name: 'RBK Talents',
      description:
        'Dashboard for managing and tracking students at RBK Tunisia. deepened my knowledge of TypeScript and NestJS.',
      status: 'prototype',
      stack: [
        { name: 'React', slug: 'react' },
        { name: 'Nestjs', slug: 'nestjs' },
        { name: 'MongoDB', slug: 'mongodb' },
        { name: 'TypeScript', slug: 'typescript' },
        { name: 'Tailwind CSS', slug: 'tailwindcss' },
      ],
    },
    {
      type: 'project',
      date: 'March 2021',
      name: 'Adrissa Web/Mobile',
      description:
        'A web and mobile platform for visting and rating locations in Tunisia. It was my first hands-on experience with react native.',
      status: 'prototype',
      stack: [
        { name: 'Vue', slug: 'vue.js' },
        { name: 'Nestjs', slug: 'nestjs' },
        { name: 'React', slug: 'react' },
        { name: 'Expo', slug: 'expo' },
      ],
    },
    {
      type: 'project',
      date: 'January 2022',
      name: 'Euromedi Auditor',
      description:
        'App for healthcare accreditation and auditing. working closely with doctors in belgium to offer healthcare services that meet the highest standards.',
      status: 'shipped',
      url: 'https://hbib24.github.io/Auditor',
      stack: [
        { name: 'Vue', slug: 'vue.js' },
        { name: 'Angular', slug: 'angular' },
        { name: 'PrimeNG', slug: 'primeng' },
        { name: 'Tailwind CSS', slug: 'tailwindcss' },
      ],
    },
    {
      type: 'career',
      date: 'June 2022',
      title: 'Joined Insight Plus',
      role: 'Fullstack Developer',
      description: 'Developing web/mobile Fintech Solutions.',
    },
    {
      type: 'project',
      date: 'July 2023',
      name: 'Connect Web/Mobile',
      description:
        'Public website and mobile app for displaying real-time currency rates and exchange offices locations.',
      status: 'shipped',
      stack: [
        { name: 'Angular', slug: 'angular' },
        { name: 'React', slug: 'react' },
        { name: 'Expo', slug: 'expo' },
      ],
    },
    {
      type: 'project',
      date: 'September 2023',
      name: 'ATAA',
      description:
        'A mobile app that connects volunteers with associations to support community service, featuring a rewards system, real-time chat, and notifications. It was my first hands-on experience with Flutter.',
      status: 'prototype',
      stack: [
        { name: 'Flutter', slug: 'flutter' },
        { name: 'NestJS', slug: 'nestjs' },
        { name: 'Socket.io', slug: 'socket.io' },
        { name: 'mySQL', slug: 'mysql' },
      ],
    },
    {
      type: 'project',
      date: 'March 2023',
      name: 'Exsys ERP',
      description:
        'Erp system destined for exchange offices as well as payment service providers for managing their daily financial operations, inventory, and human resources, with real-time analytics and reporting.',
      status: 'shipped',
      url: 'https://erp.exsysplatform.com',
      stack: [
        { name: 'React', slug: 'react' },
        { name: 'Bootstrap', slug: 'bootstrap' },
        { name: 'Symfony', slug: 'symfony' },
        { name: 'mySQL', slug: 'mysql' },
      ],
    },
    {
      type: 'project',
      date: 'March 2023',
      name: 'Exsys Rates Display',
      description: 'A web application for displaying real-time currency rates of exchange offices.',
      status: 'shipped',
      url: 'https://display.exsysplatform.com',
      stack: [
        { name: 'Vue', slug: 'vue.js' },
        { name: 'Vuetify', slug: 'vuetify' },
        { name: 'Symfony', slug: 'symfony' },
        { name: 'mySQL', slug: 'mysql' },
      ],
    },
    {
      type: 'project',
      date: 'March 2023',
      name: 'Exsys Marketplace',
      description:
        'A marketplace for trading currencies, mainly between exchange offices and banks, including a comprehensive flow for bartering currencies and managing orders.',
      status: 'shipped',
      url: 'https://fx.exsysplatform.com',
      stack: [
        { name: 'React', slug: 'react' },
        { name: 'Bootstrap', slug: 'bootstrap' },
        { name: 'Symfony', slug: 'symfony' },
        { name: 'mySQL', slug: 'mysql' },
      ],
    },
    {
      type: 'project',
      date: 'march 2024',
      name: 'Exsys Common Package',
      description:
        'A collection of common components and utilities for the Exsys platform to streamline and unify the development process. Includes data tables, charts, and a dynamic form generator.',
      status: 'shipped',
      url: 'https://www.npmjs.com/package/exsys-common',
      stack: [
        { name: 'Angular', slug: 'angular' },
        { name: 'Ant Design', slug: 'antdesign' },
      ],
    },
    {
      type: 'project',
      date: 'September 2025',
      name: 'Trust',
      description:
        'Public platform for consulting currency rates and ordering currencies online. Includes map locations and order tracking.',
      status: 'shipped',
      stack: [
        { name: 'Angular', slug: 'angular' },
        { name: 'Tailwind CSS', slug: 'tailwindcss' },
        { name: 'Express', slug: 'express' },
      ],
    },
    {
      type: 'project',
      date: 'March 2026',
      name: 'Vanilla',
      description:
        'A comprehensive financial super app that combines a secure digital wallet, seamless payment services, and robust security features to help users manage their money and complete transactions with confidence.',
      status: 'prototype',
      stack: [
        { name: 'Angular', slug: 'angular' },
        { name: 'Flutter', slug: 'flutter' },
        { name: 'Tailwind CSS', slug: 'tailwindcss' },
        { name: 'Symfony', slug: 'symfony' },
        { name: 'mySQL', slug: 'mysql' },
      ],
    },
  ];

  /**
   * Sample data: set your own levels and categories.
   * Add a skill here and the graph, the mobile list and the project links all update.
   * `slug` must match the slug used in the `stack` of your projects to link them.
   */
  protected readonly skills: Skill[] = [
    { name: 'Angular', slug: 'angular', level: 'core', category: 'Frontend' },
    { name: 'Tailwind CSS', slug: 'tailwindcss', level: 'core', category: 'Frontend' },
    { name: 'NestJS', slug: 'nestjs', level: 'core', category: 'Backend' },
    { name: 'MySQL', slug: 'mysql', level: 'core', category: 'Data' },
    { name: 'React', slug: 'react', level: 'proficient', category: 'Frontend' },
    { name: 'Vue', slug: 'vue.js', level: 'proficient', category: 'Frontend' },
    { name: 'Express', slug: 'express', level: 'proficient', category: 'Backend' },
    { name: 'Expo', slug: 'expo', level: 'familiar', category: 'Mobile' },
    { name: 'Symfony', slug: 'symfony', level: 'familiar', category: 'Backend' },
    { name: 'Socket.io', slug: 'socket.io', level: 'familiar', category: 'Backend' },
    { name: 'MongoDB', slug: 'mongodb', level: 'familiar', category: 'Data' },
    { name: 'Flutter', slug: 'flutter', level: 'familiar', category: 'Mobile' },
    { name: 'Ionic', slug: 'ionic', level: 'familiar', category: 'Mobile' },
  ];

  private readonly skillBySlug = new Map<string, Skill>(
    this.skills.map((skill): [string, Skill] => [skill.slug, skill]),
  );

  private readonly levelLabel: Record<SkillLevel, string> = {
    core: 'Core',
    proficient: 'Proficient',
    familiar: 'Familiar',
  };

  /** Mobile / tablet: skills grouped as "Core" first, then by category. */
  protected readonly skillGroups = this.buildSkillGroups();

  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  private readonly skillGraph = viewChild.required<ElementRef<HTMLDivElement>>('skillGraph');
  private readonly layout = signal<LayoutResult>({ nodes: [], rings: [] });

  protected readonly graphNodes = computed<GraphNode[]>(() =>
    this.layout().nodes.map((node) => ({ ...node, skill: this.skillBySlug.get(node.id) })),
  );
  protected readonly graphRings = computed(() => this.layout().rings);

  /** Hover (mouse only) previews a skill; click / tap pins it. */
  private readonly hoveredSlug = signal<string | null>(null);
  protected readonly pinnedSlug = signal<string | null>(null);
  protected readonly activeSlug = computed(() => this.hoveredSlug() ?? this.pinnedSlug());

  protected readonly activeSkill = computed(() => {
    const slug = this.activeSlug();
    return slug ? (this.skillBySlug.get(slug) ?? null) : null;
  });
  protected readonly pinnedSkill = computed(() => {
    const slug = this.pinnedSlug();
    return slug ? (this.skillBySlug.get(slug) ?? null) : null;
  });

  /** The active skill plus every skill used in the same projects. */
  private readonly relatedSlugs = computed(() => {
    const related = new Set<string>();
    const slug = this.activeSlug();
    if (!slug) return related;

    related.add(slug);
    for (const project of this.projectsFor(slug)) {
      for (const tech of project.stack) related.add(tech.slug);
    }
    return related;
  });

  /** Lines from the active skill to the skills it was used with. */
  protected readonly graphLines = computed(() => {
    const slug = this.activeSlug();
    if (!slug) return [];

    const positions = new Map(this.layout().nodes.map((node) => [node.id, node]));
    const from = positions.get(slug);
    if (!from) return [];

    return [...this.relatedSlugs()]
      .filter((other) => other !== slug)
      .flatMap((other) => {
        const to = positions.get(other);
        return to ? [{ id: other, x1: from.x, y1: from.y, x2: to.x, y2: to.y }] : [];
      });
  });

  protected projectsFor(slug: string): ProjectItem[] {
    return this.workItems.filter(
      (item): item is ProjectItem =>
        item.type === 'project' && item.stack.some((tech) => tech.slug === slug),
    );
  }

  protected levelText(skill: Skill): string {
    return this.levelLabel[skill.level];
  }

  protected groupName(skill: Skill): string {
    return skill.level === 'core' ? 'Core' : skill.category;
  }

  protected iconUrl(slug: string): string {
    return `https://cdn.simpleicons.org/${slug}/fafafa`;
  }

  protected skillClass(skill: Skill): string {
    const base =
      'inline-flex items-center gap-2 whitespace-nowrap rounded-full border font-mono cursor-pointer transition-all duration-300';
    return `${base} ${LEVEL_CLASS[skill.level]} ${STATE_CLASS[this.skillState(skill.slug)]}`;
  }

  protected iconClass(skill: Skill): string {
    return `${ICON_CLASS[skill.level]} opacity-90`;
  }

  protected hoverSkill(event: PointerEvent, slug: string): void {
    if (event.pointerType === 'mouse') this.hoveredSlug.set(slug);
  }

  protected unhoverSkill(event: PointerEvent): void {
    if (event.pointerType === 'mouse') this.hoveredSlug.set(null);
  }

  protected pinSkill(event: Event, slug: string): void {
    event.stopPropagation();
    this.pinnedSlug.update((current) => (current === slug ? null : slug));
  }

  protected clearPin(): void {
    this.pinnedSlug.set(null);
  }

  private skillState(slug: string): SkillState {
    const active = this.activeSlug();
    if (!active) return 'idle';
    if (slug === active) return 'active';
    return this.relatedSlugs().has(slug) ? 'related' : 'dim';
  }

  private buildSkillGroups(): { name: string; skills: Skill[] }[] {
    const rank: Record<SkillLevel, number> = { core: 0, proficient: 1, familiar: 2 };
    const groups = new Map<string, Skill[]>();

    for (const skill of [...this.skills].sort((a, b) => rank[a.level] - rank[b.level])) {
      const name = this.groupName(skill);
      groups.set(name, [...(groups.get(name) ?? []), skill]);
    }
    return [...groups].map(([name, skills]) => ({ name, skills }));
  }

  /** Lays the graph out for the size it actually has (it is display:none below `lg`). */
  private layoutGraph(): void {
    const el = this.skillGraph().nativeElement;
    if (el.clientWidth < 300 || el.clientHeight < 240) return;

    this.layout.set(
      layoutSkillGraph(
        this.skills.map((skill) => ({
          id: skill.slug,
          label: skill.name,
          level: skill.level,
          category: skill.category,
        })),
        el.clientWidth,
        el.clientHeight,
      ),
    );
  }

  protected readonly year = new Date().getFullYear();

  /** Sample values: replace with your own links. */
  protected readonly contactLinks: ContactLink[] = [
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/hbib-bekir',
      href: 'https://www.linkedin.com/in/hbib-bekir',
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      value: 'github.com/hbib24',
      href: 'https://github.com/hbib24',
      icon: 'github',
    },
    {
      label: 'Email',
      value: 'habib.bekir@gmail.com',
      href: 'mailto:habib.bekir@gmail.com',
      icon: 'mail',
    },
  ];

  protected readonly contactStatus = signal<ContactStatus>('idle');
  protected readonly contactError = signal('');

  /** Shown as the status pill in the Contact section. Set `open` to false when you're not available. */
  protected readonly availability = {
    open: true,
    label: 'Open for work',
    note: 'Freelance projects and full-time roles',
  };

  private readonly contactWrapper = viewChild.required<ElementRef<HTMLElement>>('contactWrapper');

  /**
   * 0 → 1 while the Skills section slides away and reveals Contact underneath
   * (the mirror image of the hero → Work transition). Defaults to 1 (fully revealed), which is
   * also the value below lg, where nothing is pinned.
   */
  private readonly contactReveal = signal(1);

  /** Contact content rises into place as it is revealed (hero content does the opposite). */
  protected readonly contactTransform = computed(() => {
    const p = this.contactReveal();
    return `translate3d(0, ${(1 - p) * 15}dvh, 0) scale(${0.94 + p * 0.06})`;
  });

  /** The halo slides down from above the section into its half-visible spot. */
  protected readonly haloTransform = computed(() => {
    const p = this.contactReveal();
    return `translate3d(0, ${-(1 - p) * 30}dvh, 0) scale(${0.85 + p * 0.15})`;
  });

  protected clearContactStatus(): void {
    if (this.contactStatus() !== 'sending') this.contactStatus.set('idle');
  }

  protected async sendMessage(event: Event, form: HTMLFormElement): Promise<void> {
    event.preventDefault();
    if (this.contactStatus() === 'sending') return;

    this.contactStatus.set('sending');
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (response.ok) {
        form.reset();
        this.contactStatus.set('sent');
        return;
      }

      const data = (await response.json().catch(() => null)) as {
        errors?: { message: string }[];
      } | null;
      this.contactError.set(
        data?.errors?.map((error) => error.message).join(', ') ||
          'Something went wrong. Please try again.',
      );
    } catch {
      this.contactError.set("Couldn't reach the server. Check your connection and try again.");
    }
    this.contactStatus.set('error');
  }

  // Angular keeps only one host listener per event per component, so every scroll/resize-driven
  // effect has to be dispatched from this single handler.
  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange() {
    this.updateActivePanel();
    this.updateContactReveal();
  }

  updateContactReveal() {
    // Contact is only pinned / revealed from lg up; below that it is a normal section.
    if (!window.matchMedia('(min-width: 1024px)').matches) {
      this.contactReveal.set(1);
      return;
    }

    const top = this.contactWrapper().nativeElement.getBoundingClientRect().top;
    this.contactReveal.set(Math.min(Math.max(-top / window.innerHeight, 0), 1));
  }

  ngAfterViewInit(): void {
    // Set the correct panel immediately (e.g. on refresh mid-scroll)
    // instead of waiting for the first scroll/resize event.
    this.updateActivePanel();
    this.updateContactReveal();

    // (Re)compute the skill graph whenever its container changes size.
    const observer = new ResizeObserver(() => this.zone.run(() => this.layoutGraph()));
    observer.observe(this.skillGraph().nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  @HostListener('document:mousemove', ['$event'])
  moveFollower(event: MouseEvent) {
    const x = event.clientX - 15;
    const y = event.clientY - 15;

    this.follower().nativeElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  updateActivePanel() {
    const el = this.pinWrapper().nativeElement;
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // The wrapper is: 1 sticky viewport + the distance that holds the panels
    // + 1 viewport during which the Work section slides over the pinned hero.
    const scrollRange = el.offsetHeight - viewportHeight;
    const holdDistance = scrollRange - viewportHeight;

    if (holdDistance <= 0) {
      this.activeIndex.set(0);
      this.coverProgress.set(0);
      return;
    }

    // How far we've scrolled into the wrapper, clamped to its range.
    const scrolledInto = Math.min(Math.max(-rect.top, 0), scrollRange);

    // Panels advance during the hold distance only.
    const progress = Math.min(scrolledInto / holdDistance, 1);
    const index = Math.min(this.panelCount - 1, Math.floor(progress * this.panelCount));
    this.activeIndex.set(index);

    // Afterwards the Work section covers the hero: 0 → 1 over one viewport.
    const cover = (scrolledInto - holdDistance) / viewportHeight;
    this.coverProgress.set(Math.min(Math.max(cover, 0), 1));
  }
}
