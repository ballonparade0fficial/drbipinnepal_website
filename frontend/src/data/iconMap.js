import { FaFlask, FaVial, FaShieldVirus, FaHandsHelping, FaHeartbeat, FaGlobeAsia } from "react-icons/fa";
import { FiActivity, FiTrendingUp } from "react-icons/fi";

// Shared icon options for any content-driven card grid (Research, Impact, …).
// Keys are the values a CMS field should offer — stable strings, not tied to
// the react-icons package names, so swapping the underlying icon library
// later doesn't require touching content.
export const ICON_MAP = {
  flask: FaFlask,
  vial: FaVial,
  shield: FaShieldVirus,
  activity: FiActivity,
  "hands-helping": FaHandsHelping,
  heartbeat: FaHeartbeat,
  "trending-up": FiTrendingUp,
  globe: FaGlobeAsia,
};

/**
 * Resolve an icon for a content item.
 * - If `item.icon` names a known key, use it (author's explicit choice).
 * - Otherwise cycle through `fallbackOrder` by position, so unlimited items
 *   always get *an* icon and nothing ever throws — it just won't be a
 *   meaningful one until the author picks one.
 */
export function resolveIcon(item, fallbackOrder, index) {
  if (item?.icon && ICON_MAP[item.icon]) {
    return ICON_MAP[item.icon];
  }
  return fallbackOrder[index % fallbackOrder.length];
}
