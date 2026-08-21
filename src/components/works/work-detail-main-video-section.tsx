"use client";

import type { Content } from "@prismicio/client";

import { getVimeoEmbedUrl } from "@/utils/vimeo";

interface WorkDetailMainVideoSectionProps {
	work?: Content.WorkDocument;
}

export default function WorkDetailMainVideoSection({
	work,
}: WorkDetailMainVideoSectionProps) {
	const video = work?.data?.video;
	const embedUrl = video ? getVimeoEmbedUrl(video) : null;
	if (!embedUrl) return null;

	return (
		<section id="main-video" className="grid-margin">
			<div className="video-wrap st-xl-16 st-xl-os-1 xl-top-3">
				<div
					className="video-embed"
					style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
				>
					<iframe
						src={embedUrl}
						frameBorder="0"
						allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
						title="Work Video"
					/>
				</div>
			</div>
		</section>
	);
}
