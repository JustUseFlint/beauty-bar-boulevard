import { readFileSync } from 'node:fs';
export const DIMS = JSON.parse(readFileSync(new URL('./dims.json', import.meta.url)));
export const BASE = 'https://justuseflint.github.io/beauty-bar-boulevard/';
export const CHECKED = 'Nov 9, 2026';
export const PHONE = '(765) 365-5000';
export const TEL = 'tel:+17653655000';
export const FB = 'https://www.facebook.com/beautybarontheboulevard';
export const ADDR1 = '408 E. South Boulevard';
export const ADDR2 = 'Crawfordsville, IN 47933';
export const GMAPS = 'https://www.google.com/maps/search/?api=1&query=Beauty+Bar+on+the+Boulevard%2C+408+E+South+Blvd%2C+Crawfordsville%2C+IN+47933';
export const AMAPS = 'https://maps.apple.com/?q=Beauty+Bar+on+the+Boulevard&address=408+E+South+Blvd,+Crawfordsville,+IN+47933';
export const GREVIEWS = 'https://www.google.com/maps/search/?api=1&query=Beauty+Bar+On+The+Boulevard+Crawfordsville+IN';
// Hours from the salon's Facebook page (matches Yelp, Sep 2026). Google shows Mon–Fri 10–5, Sat 8–12. Confirm with owner.
export const HOURS = [null, [9, 19], [9, 19], [9, 19], [9, 19], [9, 15], [9, 15]]; // Sun..Sat
export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const SRC = {
  yelp: 'Listed by the salon on Yelp',
  google: 'On their Google profile',
  jr: 'In the salon’s 2018 staff announcement',
  fb: 'From the salon’s 2026 Facebook posts',
  photo: 'Seen in the salon’s own photos',
  review: 'Mentioned in client reviews',
};

// Services: no prices are published anywhere, so none are shown.
export const GROUPS = [
  { id: 'hair', name: 'Hair', roman: 'I', line: 'Cuts, color, curls and perms.' },
  { id: 'nails', name: 'Nails', roman: 'II', line: 'Manicures, pedicures, gel, acrylic and art.' },
  { id: 'skin', name: 'Skin', roman: 'III', line: 'Waxing, facials and lash & brow. Ask what’s on the books.' },
];
export const SERVICES = [
  { id: 'cut', g: 'hair', n: 'Haircut', d: 'Cuts for every length, from a quick trim to precision cutting and a whole new shape.', src: ['google', 'fb', 'review'], prep: 'How short you want to go, and a photo if you have one', img: 'int-wide' },
  { id: 'color', g: 'hair', n: 'Color', d: 'All-over color, refreshes and dimensional color that adds depth.', src: ['google', 'fb'], prep: 'Your last color and roughly when it was done', img: 'curls-after' },
  { id: 'vivid', g: 'hair', n: 'Vivid color', d: 'Bold fashion shades, like the violet curls in the salon’s own photos.', src: ['jr', 'photo'], prep: 'The shade you’re after, and whether your hair has been lightened before', img: 'curls-after' },
  { id: 'curly', g: 'hair', n: 'Curly hair', d: 'Cuts and care for curls and waves.', src: ['google', 'review'], prep: 'How you usually wear your curls day to day', img: 'curls-after' },
  { id: 'perm', g: 'hair', n: 'Perm', d: 'Classic perms for body and curl.', src: ['google', 'jr'], prep: 'The size of curl you want', img: 'curls-after' },
  { id: 'straight', g: 'hair', n: 'Straight perm', d: 'Relaxing and straightening for smoother hair.', src: ['google'], prep: 'Any chemical services in the last few months', img: 'int-wide' },
  { id: 'kids', g: 'hair', n: 'Kids’ cut', d: 'Haircuts for kids. Their Google profile lists the salon as good for kids.', src: ['google', 'review'], prep: 'Your child’s age, and any picture day deadline', img: 'reception' },
  { id: 'ext', g: 'hair', n: 'Extensions', d: 'Added length and fullness.', src: ['google'], prep: 'The length and fullness you want', img: 'int-wide' },
  { id: 'updo', g: 'hair', n: 'Updo', d: 'Styling for weddings, dances and big nights.', src: ['jr'], prep: 'The date and time of your event', img: 'int-wide' },
  { id: 'design', g: 'hair', n: 'Design cut', d: 'Shaved details and creative cuts.', src: ['jr'], prep: 'A photo of the design you like', img: 'int-wide' },
  { id: 'mani', g: 'nails', n: 'Manicure', d: 'Shape, cuticle care and polish.', src: ['yelp', 'jr', 'review'], prep: 'Polish or gel, and a color idea', img: 'nails-pink' },
  { id: 'manipedi', g: 'nails', n: 'Manicure & pedicure', d: 'Hands and feet in one visit.', src: ['yelp'], prep: 'That you’d like both, so they can hold enough time', img: 'nails-slate' },
  { id: 'pedi', g: 'nails', n: 'Pedicure', d: 'Basic or gel pedicures.', src: ['jr'], prep: 'Polish or gel', img: 'nails-night' },
  { id: 'gel', g: 'nails', n: 'Gel nails', d: 'Glossy, chip-resistant gel color.', src: ['jr'], prep: 'Whether you have gel on now that needs to come off', img: 'nails-ribbon' },
  { id: 'acrylic', g: 'nails', n: 'Acrylic nails', d: 'Full sets in the length and shape you want.', src: ['jr'], prep: 'Length and shape (square, almond, coffin…)', img: 'nails-lattice' },
  { id: 'fill', g: 'nails', n: 'Fill-in', d: 'Keep an existing set fresh.', src: ['yelp'], prep: 'When your set was last done', img: 'nails-blue' },
  { id: 'art', g: 'nails', n: 'Nail art', d: 'Hand-painted details, from holiday plaid to florals.', src: ['photo', 'review'], prep: 'A photo of the design, or one from our Looks page', img: 'nails-floral' },
  { id: 'polish', g: 'nails', n: 'Polish change', d: 'New color, no full manicure.', src: ['yelp'], prep: 'Hands, toes or both', img: 'nails-holiday' },
  { id: 'removal', g: 'nails', n: 'Polish removal', d: 'Take off what’s there, gently.', src: ['yelp'], prep: 'Whether it’s regular polish, gel or acrylic', img: 'nails-slate' },
  { id: 'facewax', g: 'skin', n: 'Facial waxing', d: 'Brows, lip and chin.', src: ['jr'], prep: 'Which areas', ask: true },
  { id: 'bodywax', g: 'skin', n: 'Body waxing', d: 'Waxing beyond the face.', src: ['jr'], prep: 'Which areas', ask: true },
  { id: 'facial', g: 'skin', n: 'Facial', d: 'Cleansing and skin treatments.', src: ['jr'], prep: 'Any skin sensitivities', ask: true },
  { id: 'tint', g: 'skin', n: 'Lash & brow tint', d: 'Darker, defined lashes and brows.', src: ['jr'], prep: 'Any allergies', ask: true },
  { id: 'makeup', g: 'skin', n: 'Makeup', d: 'Makeup for photos and events.', src: ['jr'], prep: 'The date and the look', ask: true },
];

// Named publicly by the salon's posts or reviews; confirm who is currently in before launch.
export const TEAM = [
  { id: 'ashley', n: 'Ashley Clute', role: 'Hair · color & cutting', since: 'Joined May 2026', d: 'Nearly two decades behind the chair, known for customized and dimensional color, precision cutting and a client-first approach.', src: 'Salon Facebook posts, May & Jul 2026', tel: 'tel:+17657191140', phone: '765-719-1140' },
  { id: 'kira', n: 'Kira Thayer', role: 'Hair', since: 'Reviews 2025–26', d: '“Super sweet and patient, and does absolutely lovely work!”', src: 'Google reviews, Sep 2025 & Jan 2026' },
  { id: 'jennie', n: 'Jennie', role: 'Ask about her services', since: 'Posted Apr 2026', d: '“This girl is so good and has very few openings, get in her schedule while you can!”', src: 'Salon Facebook post, Apr 2026' },
  { id: 'marcie', n: 'Marcie', role: 'Nails', since: 'Reviews 2018–23', d: 'Gel and acrylic sets, manicures and pedicures. “You can tell she cares about her work and her clients.”', src: 'Journal Review 2018; Google review, Oct 2023' },
  { id: 'rosie', n: 'Rosie Keller', role: 'Owner · master stylist', since: 'Doing hair since 1969', d: 'Ran Crystal Rose for 36 years before opening Beauty Bar on the Boulevard in 2018.', src: 'Journal Review, Jul 2018' },
];

export const REVIEWS = [
  { q: 'Kira is super sweet and patient, and does absolutely lovely work! The prices are the best in town, and they are wheelchair accessible, which is important to us.', s: 'Google review · Jan 2026' },
  { q: 'Friendly service and they don’t rush you out the door. My stylist took her time and did as I asked.', s: 'Google review' },
  { q: 'Marcie did my nails today and she did a fantastic job. You can tell she cares about her work and her clients.', s: 'Google review · Oct 2023' },
  { q: 'Called for an appointment for a haircut and they got me in the next morning!', s: 'Google review · Aug 2022' },
  { q: 'One of the best salons I’ve ever been to. Thanks for taking care of my curly hair.', s: 'Google review' },
];

export const LOOKS = [
  { img: 'curls-after', t: 'Violet curls', k: 'hair', cap: 'Color and curl' },
  { img: 'nails-floral', t: 'Painted florals', k: 'nails', cap: 'Nail art on red' },
  { img: 'nails-lattice', t: 'Copper lattice', k: 'nails', cap: 'Hand-painted grid on gray' },
  { img: 'reception', t: 'The front desk', k: 'salon', cap: 'Reception, 408 E. South Blvd' },
  { img: 'nails-ribbon', t: 'Pink ribbon', k: 'nails', cap: 'Ribbon accent nails' },
  { img: 'nails-holiday', t: 'Holiday red', k: 'nails', cap: 'Red with a bow accent' },
  { img: 'int-wide', t: 'The floor', k: 'salon', cap: 'Stations, dryers and the shampoo bowls' },
  { img: 'nails-blue', t: 'Midnight & gold', k: 'nails', cap: 'Navy with gold detail' },
  { img: 'nails-pink', t: 'Pink marble', k: 'nails', cap: 'Pink with painted accents' },
  { img: 'holiday', t: 'December window', k: 'salon', cap: 'The front window at the holidays' },
  { img: 'nails-night', t: 'Black & silver', k: 'nails', cap: 'Black with silver art' },
  { img: 'nails-slate', t: 'Slate set', k: 'nails', cap: 'Black and slate with accents' },
];
