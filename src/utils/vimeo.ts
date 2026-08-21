import { type EmbedField, isFilled } from "@prismicio/client";

/**
 * Player flags shared by every Vimeo embed on the site.
 *
 * Deliberately NOT `background=1`. That flag is a paid-plan feature: a video
 * hosted on a free Vimeo account refuses to load with it and renders Vimeo's
 * "This video cannot be played with the current embed configuration." screen
 * instead. Since editors paste whatever Vimeo link they are handed — often one
 * from a collaborator's free account — the site can't assume a plan tier.
 *
 * `controls=0` plus the autoplay trio reproduces what `background=1` gave us
 * (chromeless, silent, looping playback) on every account tier. Unlike
 * `background=1` the player still accepts clicks, so the CSS that sizes these
 * iframes also sets `pointer-events: none` to keep them decorative.
 */
const PLAYER_PARAMS = [
	"badge=0",
	"autopause=0",
	"player_id=0",
	"app_id=58479",
	"autoplay=1",
	"muted=1",
	"loop=1",
	"controls=0",
	"title=0",
	"byline=0",
	"portrait=0",
].join("&");

/**
 * Pull the numeric video id out of a Prismic embed, whichever shape Prismic
 * resolved the pasted URL into.
 */
function getVideoId(embed: EmbedField): string | null {
	if (!isFilled.embed(embed)) return null;

	if (embed.video_id) return String(embed.video_id);

	const html = embed.html ?? "";
	const htmlMatch = html.match(/video\/(\d+)/);
	if (htmlMatch) return htmlMatch[1];

	const embedUrl = embed.embed_url ?? "";
	const urlMatch = embedUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
	return urlMatch ? urlMatch[1] : null;
}

/**
 * Unlisted videos are only playable when the embed carries their privacy hash.
 * Vimeo exposes it as `?h=` in the resolved embed html and as the second path
 * segment (`vimeo.com/<id>/<hash>`) in a share link, so check both — dropping
 * it is the other way a pasted URL turns into a dead player.
 */
function getPrivacyHash(embed: EmbedField): string | null {
	if (!isFilled.embed(embed)) return null;

	const sources = [embed.html ?? "", embed.embed_url ?? ""];

	for (const source of sources) {
		const queryMatch = source.match(/[?&]h=([0-9a-zA-Z]+)/);
		if (queryMatch) return queryMatch[1];

		const pathMatch = source.match(
			/vimeo\.com\/(?:video\/)?\d+\/([0-9a-zA-Z]+)/,
		);
		if (pathMatch) return pathMatch[1];
	}

	return null;
}

/**
 * Build the player URL for a Prismic embed field, or return null when the
 * field is empty or holds something that isn't a Vimeo video — callers render
 * nothing in that case rather than an iframe pointed at a broken URL.
 */
export function getVimeoEmbedUrl(embed: EmbedField): string | null {
	const videoId = getVideoId(embed);
	if (!videoId) return null;

	const hash = getPrivacyHash(embed);
	const params = hash ? `h=${hash}&${PLAYER_PARAMS}` : PLAYER_PARAMS;

	return `https://player.vimeo.com/video/${videoId}?${params}`;
}
