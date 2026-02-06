"use client";

import { createClient } from "@/prismicio";
import { type Content, filter, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { useCallback, useEffect, useMemo, useState } from "react";
import NewsletterBox from "./newsletter-box";

type BlogSectionProps = {
	data: Content.BlogDocumentData;
};

export default function BlogSection({ data }: BlogSectionProps) {
	const [blogPosts, setBlogPosts] = useState<Content.BlogPostDocument[]>([]);
	const [allBlogPosts, setAllBlogPosts] = useState<Content.BlogPostDocument[]>(
		[],
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const client = useMemo(() => createClient(), []);
	const pageSize = 6;

	const featuredPosts = useMemo(() => {
		return data.featured_blog_posts
			.map((item) => item.post)
			.filter((post) => isFilled.contentRelationship(post) && post.data)
			.slice(0, 3);
	}, [data.featured_blog_posts]);

	// Combine featured posts with regular posts to fill up to 3
	const displayedPosts = useMemo(() => {
		const posts: Array<
			Content.BlogPostDocument | (typeof featuredPosts)[number]
		> = [...featuredPosts];
		const neededPosts = 3 - featuredPosts.length;

		if (neededPosts > 0 && allBlogPosts.length > 0) {
			const fillerPosts = allBlogPosts.slice(0, neededPosts);
			posts.push(...fillerPosts);
		}
		return posts;
	}, [featuredPosts, allBlogPosts]);

	// Exclude all displayed posts from the main listing
	const displayedPostIds = useMemo(() => {
		return displayedPosts
			.map((item) => {
				if ("id" in item && item.id) {
					return item.id;
				}
				return null;
			})
			.filter((item): item is string => item !== null);
	}, [displayedPosts]);

	// Create individual filter.not() conditions for each displayed post ID
	const excludeFilters = useMemo(() => {
		return displayedPostIds.map((id) => filter.not("document.id", id));
	}, [displayedPostIds]);

	// refresh the pageToPage links when the displayedPostIds change
	useEffect(() => {
		setTimeout(() => {
			document.dispatchEvent(new CustomEvent("pageToPage:links:refresh"));
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, 200);
	}, [displayedPosts]);

	// Initial fetch to get all blog posts for filling featured section
	useEffect(() => {
		const fetchAllPosts = async () => {
			try {
				const response = await client.getByType("blog_post", {
					page: 1,
					pageSize: 3,
					orderings: [
						{ field: "document.first_publication_date", direction: "desc" },
					],
					fetchLinks: [
						"blog_post.title",
						"blog_post.featured_image",
						"blog_post.tags",
						"blog_post.excerpt",
					],
				});
				setAllBlogPosts(response.results);
			} catch (error) {
				console.error("Error fetching all blog posts:", error);
			}
		};

		fetchAllPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchBlogPosts = useCallback(
		async (page: number, append = false) => {
			setIsLoading(true);
			try {
				const response = await client.getByType("blog_post", {
					page,
					pageSize,
					orderings: [
						{ field: "document.first_publication_date", direction: "desc" },
					],
					fetchLinks: [
						"blog_post.title",
						"blog_post.featured_image",
						"blog_post.tags",
						"blog_post.excerpt",
					],
					filters: excludeFilters.length > 0 ? excludeFilters : undefined,
				});

				if (append) {
					setBlogPosts((prev) => [...prev, ...response.results]);
				} else {
					setBlogPosts(response.results);
				}

				// Check if there are more pages
				setHasMore(page < response.total_pages);
			} catch (error) {
				console.error("Error fetching blog posts:", error);
			} finally {
				setIsLoading(false);
			}
		},
		[client, excludeFilters],
	);

	useEffect(() => {
		if (displayedPostIds.length > 0) {
			fetchBlogPosts(1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [displayedPostIds.length]);

	const handleLoadMore = () => {
		if (!isLoading && hasMore) {
			const nextPage = currentPage + 1;
			setCurrentPage(nextPage);
			fetchBlogPosts(nextPage, true);
		}
	};

	return (
		<section id="blog" className="grid-margin">
			<h2 className="sup-title xs-both-2">{data.blog_section_title}</h2>
			<div className="blog-featured st-grid xl-top-1 xs-wrap">
				{displayedPosts.map((item) => {
					// Check if it's a content relationship or a full document
					// Content relationships have a link_type property
					if ("link_type" in item && isFilled.contentRelationship(item)) {
						// Handle content relationship
						if (!item.data) return null;

						return (
							<article className="st-xl-6 st-xs-18" key={item.id}>
								<figure>
									<PrismicNextLink field={item}>
										{item.data.featured_image?.url && (
											<img
												alt={item.data.featured_image?.alt ?? ""}
												src={`${item.data.featured_image?.url}&fit=clip&w=1920&q=85`}
												srcSet={[
													`${item.data.featured_image?.url}&fit=clip&w=768&q=85 768w`,
													`${item.data.featured_image?.url}&fit=clip&w=1024&q=85 1024w`,
													`${item.data.featured_image?.url}&fit=clip&w=1440&q=85 1440w`,
													`${item.data.featured_image?.url}&fit=clip&w=1920&q=85 1920w`,
												].join(", ")}
												sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
												width={
													item.data.featured_image?.dimensions?.width || 1440
												}
												height={
													item.data.featured_image?.dimensions?.height || 810
												}
												loading="lazy"
												decoding="async"
												className="lazy"
											/>
										)}
									</PrismicNextLink>
								</figure>
								<div
									className="tags"
									style={{ zIndex: 2, position: "relative" }}
								>
									{item.tags.map((tag: string) => (
										<span key={tag} className="tag">
											{tag}
										</span>
									))}
								</div>
								<h3 className="f-24">
									<PrismicNextLink field={item}>
										{item.data.title}
									</PrismicNextLink>
								</h3>
								<PrismicNextLink field={item} className="blog-button">
									<img
										src="/img/svg/icon-arrow-white.svg"
										alt="Arrow pointing to right"
									/>
								</PrismicNextLink>
							</article>
						);
					}

					// Handle full document (from allBlogPosts)
					const post = item as Content.BlogPostDocument;

					return (
						<article className="st-xl-6 st-xs-18" key={post.id}>
							<figure>
								<PrismicNextLink
									document={post}
									aria-label={`Read blog post: ${post.data.title}`}
								>
									{post.data.featured_image?.url && (
										<img
											alt={post.data.featured_image?.alt ?? ""}
											src={`${post.data.featured_image?.url}&fit=clip&w=1920&q=85`}
											srcSet={[
												`${post.data.featured_image?.url}&fit=clip&w=768&q=85 768w`,
												`${post.data.featured_image?.url}&fit=clip&w=1024&q=85 1024w`,
												`${post.data.featured_image?.url}&fit=clip&w=1440&q=85 1440w`,
												`${post.data.featured_image?.url}&fit=clip&w=1920&q=85 1920w`,
											].join(", ")}
											sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
											width={
												post.data.featured_image?.dimensions?.width || 1440
											}
											height={
												post.data.featured_image?.dimensions?.height || 810
											}
											loading="lazy"
											decoding="async"
											className="lazy"
										/>
									)}
								</PrismicNextLink>
							</figure>
							<div className="tags" style={{ zIndex: 2, position: "relative" }}>
								{post.tags.map((tag: string) => (
									<span key={tag} className="tag">
										{tag}
									</span>
								))}
							</div>
							<h3 className="f-24">
								<PrismicNextLink document={post}>
									{post.data.title}
								</PrismicNextLink>
							</h3>
							<PrismicNextLink document={post} className="blog-button">
								<img
									src="/img/svg/icon-arrow-white.svg"
									alt="Arrow pointing to right"
								/>
							</PrismicNextLink>
						</article>
					);
				})}
			</div>

			<div className="blog-wrap st-grid xl-bottom-5 scroll-fix-wrap">
				<div className="st-xl-6 newsletter-box scroll-fix xs-hidden">
					<NewsletterBox
						variant="blog-listing"
						title={data.newsletter_title}
						subtitle={data.newsletter_subtitle}
					/>
				</div>
				<div className="st-xl-12 st-xs-18 blog-listing xs-bottom-10">
					{blogPosts.map((post) => (
						<article className="st-grid" key={post.id}>
							<figure className="st-xl-6 st-xs-7 xs-self-start">
								<PrismicNextLink document={post}>
									<img
										alt={post.data.featured_image?.alt ?? ""}
										src={`${post.data.featured_image?.url}&fit=clip&w=1920&q=85`}
										srcSet={[
											`${post.data.featured_image?.url}&fit=clip&w=768&q=85 768w`,
											`${post.data.featured_image?.url}&fit=clip&w=1024&q=85 1024w`,
											`${post.data.featured_image?.url}&fit=clip&w=1440&q=85 1440w`,
											`${post.data.featured_image?.url}&fit=clip&w=1920&q=85 1920w`,
										].join(", ")}
										sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
										width={post.data.featured_image?.dimensions?.width || 1440}
										height={post.data.featured_image?.dimensions?.height || 810}
										loading="lazy"
										decoding="async"
										className="lazy"
									/>
								</PrismicNextLink>
							</figure>
							<div className="st-xl-6 st-xs-11">
								<div className="tags">
									{post.tags.map((tag) => (
										<span key={tag} className="tag">
											{tag}
										</span>
									))}
								</div>
								<h2 className="f-24">
									<PrismicNextLink document={post}>
										{post.data.title}
									</PrismicNextLink>
								</h2>
								<PrismicNextLink document={post} className="blog-button">
									<img
										src="/img/svg/icon-arrow-white.svg"
										alt="Arrow pointing to right"
									/>
								</PrismicNextLink>
							</div>
						</article>
					))}

					{hasMore && (
						<a
							onClick={handleLoadMore}
							className="button button-reload button-dark"
							data-disabled={isLoading}
							type="button"
						>
							<div className="main-bg"></div>
							<div className="icon">
								<img
									src="/img/svg/icon-reload.svg"
									alt="White circular reload icon"
								/>
							</div>
							<div className="label-wrap">
								<span>{isLoading ? "Loading..." : "Load More"}</span>
								<span>{isLoading ? "Loading..." : "Load More"}</span>
							</div>
						</a>
					)}
				</div>
			</div>
		</section>
	);
}
