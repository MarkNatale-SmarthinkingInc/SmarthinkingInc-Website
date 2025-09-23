"use client";

import gsapClient from "@/lib/gsap";
import { selectGetBreadcrumbs } from "@/stores/ui.selectors";
import uiStore from "@/stores/ui.store";
import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

const PageToPage = () => {
  const { setBreadcrumbs, setIsMenuOpen } = uiStore.getState();

  const router = useRouter();
  const pathname = usePathname();
  const breadcrumbs = uiStore(selectGetBreadcrumbs);
  const lenis = useLenis();
  const isPageToPageTransitioningRef = useRef(false);
  const isPopStateRef = useRef(false);
  const targetUrlRef = useRef<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // when the route changes, reset the breadcrumbs
    return () => {
      setBreadcrumbs([]);
    };
  }, [pathname]);

  const onLeave = useCallback(() => {
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
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, lock: true, force: true });
      lenis.start();
    }
  }, [router, lenis]);

  const onEnter = useCallback(() => {
    isPageToPageTransitioningRef.current = false;
  }, []);

  const leavePathAnimation = useCallback(
    (targetUrl: string) => {
      targetUrlRef.current = targetUrl;

      lenis?.stop();

      const body = document.body;
      gsapClient.to(body, {
        opacity: 0,
        duration: 0.5,
        ease: "power4.out",
        onComplete: onLeave,
      });
    },
    [onLeave, lenis]
  );

  const enterPathAnimation = useCallback(() => {
    onEnter();
    const body = document.body;
    // const appearFadeInAnims = document.querySelectorAll(
    //   `[data-appear-anim=${animsLib.appearAnims.fadeIn}]`
    // );
    // const appearYSlideUpAnims = document.querySelectorAll(
    //   `[data-appear-anim=${animsLib.appearAnims.ySlideUp}]`
    // );
    // const appearTitleAnims = document.querySelectorAll(
    //   `[data-appear-anim=${animsLib.appearAnims.title}]`
    // );
    // const appearCopyAnims = document.querySelectorAll(
    //   `[data-appear-anim=${animsLib.appearAnims.copy}]`
    // );

    gsapClient.to(body, {
      opacity: 1,
      duration: 0.5,
      ease: "power4.out",
    });
  }, [onEnter]);

  const playPageToPage = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsMenuOpen(false);
      // if (!pageToPage || !pageToPageRef.current) return

      const link = e.currentTarget as HTMLAnchorElement;
      leavePathAnimation(link.href);
    },
    [leavePathAnimation, setIsMenuOpen]
  );

  /**
   * Play the page to page animation
   * This is used to play the page to page animation when the page has changed
   */
  useEffect(() => {
    if (pathname) {
      enterPathAnimation();
    }
  }, [pathname, enterPathAnimation]);
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
