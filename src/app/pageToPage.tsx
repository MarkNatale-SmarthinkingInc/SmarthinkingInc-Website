"use client";

import gsapClient from "@/lib/gsap";
import { selectGetBreadcrumbs } from "@/stores/ui.selectors";
import uiStore from "@/stores/ui.store";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

const PageToPage = () => {
  const { setIsMenuOpen } = uiStore.getState();

  const router = useRouter();
  const pathname = usePathname();
  const breadcrumbs = uiStore(selectGetBreadcrumbs);
  const isPageToPageTransitioningRef = useRef(false);
  const isPopStateRef = useRef(false);
  const targetUrlRef = useRef<string | null>(null);
  const isFirstMountRef = useRef(true);

  // Helper function to determine page namespace from pathname
  const getPageNamespace = useCallback((pathname: string): string => {
    if (pathname === "/" || pathname === "") {
      return "home";
    }
    if (pathname === "/about") {
      return "about";
    }
    if (pathname === "/services") {
      return "services";
    }
    if (pathname.startsWith("/services/")) {
      return "service-detail";
    }
    if (pathname === "/work") {
      return "work";
    }
    if (pathname.startsWith("/work/")) {
      return "work-detail";
    }
    if (pathname === "/blog") {
      return "blog";
    }
    if (pathname.startsWith("/blog/")) {
      return "blog-detail";
    }
    if (pathname === "/contact") {
      return "contact";
    }
    return "home"; // fallback
  }, []);

  const onLeave = useCallback(() => {
    // Dispatch afterLeave event
    document.dispatchEvent(new CustomEvent("pageToPage:afterLeave"));

    if (!isPopStateRef.current) {
      // If it's a normal navigation, push the new state
      window.history.pushState(
        { url: targetUrlRef.current },
        "",
        targetUrlRef.current
      );
    }
    if (targetUrlRef.current) {
      router.push(targetUrlRef.current);
    }
    isPageToPageTransitioningRef.current = true;
    isPopStateRef.current = false;
  }, [router]);

  const onEnter = useCallback(() => {
    isPageToPageTransitioningRef.current = false;

    const pageNamespace = getPageNamespace(window.location.pathname);

    // Dispatch beforeEnter event
    document.dispatchEvent(
      new CustomEvent("pageToPage:beforeEnter", {
        detail: { pageNamespace },
      })
    );

    // Dispatch afterEnter event
    document.dispatchEvent(
      new CustomEvent("pageToPage:afterEnter", {
        detail: { pageNamespace },
      })
    );
  }, [getPageNamespace]);

  const onLeavePathAnimation = useCallback(
    (targetUrl: string) => {
      targetUrlRef.current = targetUrl;

      // Dispatch beforeLeave event
      // document.dispatchEvent(new CustomEvent("pageToPage:beforeLeave"));

      const body = document.body;
      const tl = gsapClient.timeline({
        onComplete: onLeave,
      });

      tl.to("#menu", {
        opacity: 0,
        duration: 0.45,
        yPercent: -30,
        ease: "power2.in",
      })
        .to(
          ".page-name",
          {
            opacity: 0,
            yPercent: -50,
            duration: 0.35,
            ease: "power4.in",
          },
          "<+0.1"
        )
        .to(body, {
          opacity: 0,
          duration: 1,
          ease: "power2",
        });
    },
    [onLeave]
  );

  const onEnterPathAnimation = useCallback(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }
    onEnter();
    const body = document.body;
    window.scrollTo(0, 0);

    const tl = gsapClient.timeline();
    tl.to(body, {
      opacity: 1,
      duration: 1,
      ease: "power2",
    }).fromTo(
      ".page-name",
      {
        opacity: 0,
        yPercent: 50,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.75,
        ease: "power4.inOut",
      },
      "<"
    );
  }, [onEnter]);

  const playPageToPage = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsMenuOpen(false);
      // if (!pageToPage || !pageToPageRef.current) return

      const link = e.currentTarget as HTMLAnchorElement;
      onLeavePathAnimation(link.href);
    },
    [onLeavePathAnimation, setIsMenuOpen]
  );

  /**
   * Play the page to page animation
   * This is used to play the page to page animation when the page has changed
   */
  useEffect(() => {
    if (pathname) {
      onEnterPathAnimation();
    }
  }, [pathname, onEnterPathAnimation]);
  /**
   * Intercept all links and play the page to page animation
   */

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    let links: NodeListOf<HTMLAnchorElement> | null = null;
    let linksToBind: HTMLAnchorElement[] = [];

    // artificial timeout cause some of the links are fetched on client
    for (const link of linksToBind) {
      link.removeEventListener("click", playPageToPage);
    }

    links = document.querySelectorAll("a");
    linksToBind = Array.from(links).filter((link) => {
      if (link.href.length === 0) return false;
      if (link.href.endsWith(pathname)) return false;
      if (link.href === "#") return false;
      if (link.href.includes(`${pathname}#`)) return false;
      if (link.href.startsWith("mailto:")) return false;
      if (link.href.startsWith("tel:")) return false;
      if (link.target === "_blank") return false;
      if (!link.href.includes(window.location.hostname)) return false;
      return true;
    });

    for (const link of linksToBind) {
      link.addEventListener("click", playPageToPage);
    }

    return () => {
      for (const link of linksToBind) {
        link.removeEventListener("click", playPageToPage);
      }
    };
  }, [pathname, playPageToPage, breadcrumbs]);
  // adding the breadcrumbs as well (because it is links so we need to rebind events)

  return null;
};

export default PageToPage;
