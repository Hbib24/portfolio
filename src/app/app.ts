import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { initFlowbite } from 'flowbite';

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

@Component({
  imports: [],
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

  /** Sample data: replace with your own. Newest first; entries alternate right/left. */
  protected readonly workItems: WorkItem[] = [
    {
      type: 'project',
      date: 'Sep 2026',
      name: 'Portfolio Website',
      description: 'This site: a scroll-pinned hero, device mockups and a parallax timeline.',
      status: 'in-progress',
      stack: [
        { name: 'Angular', slug: 'angular' },
        { name: 'TypeScript', slug: 'typescript' },
        { name: 'Tailwind CSS', slug: 'tailwindcss' },
      ],
    },
    {
      type: 'career',
      date: 'June 10th',
      title: 'Joined Insight Plus',
      role: 'Fullstack Developer',
      description: 'Building web and mobile products end to end.',
    },
    {
      type: 'project',
      date: 'Mar 2026',
      name: 'Realtime Dashboard',
      description: 'Live analytics with websockets, role-based access and exportable reports.',
      status: 'shipped',
      url: 'https://example.com',
      stack: [
        { name: 'Angular', slug: 'angular' },
        { name: 'Node.js', slug: 'nodedotjs' },
        { name: 'PostgreSQL', slug: 'postgresql' },
        { name: 'Docker', slug: 'docker' },
      ],
    },
    {
      type: 'project',
      date: 'Nov 2025',
      name: 'Mobile Companion App',
      description: 'Cross-platform companion app sharing one API with the web client.',
      status: 'prototype',
      stack: [
        { name: 'Flutter', slug: 'flutter' },
        { name: 'TypeScript', slug: 'typescript' },
      ],
    },
  ];

  ngOnInit(): void {
    initFlowbite();
  }

  ngAfterViewInit(): void {
    // Set the correct panel immediately (e.g. on refresh mid-scroll)
    // instead of waiting for the first scroll/resize event.
    this.updateActivePanel();
  }

  @HostListener('document:mousemove', ['$event'])
  moveFollower(event: MouseEvent) {
    const x = event.clientX - 15;
    const y = event.clientY - 15;

    this.follower().nativeElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
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