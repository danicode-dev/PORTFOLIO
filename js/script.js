const MAP_SOURCE_ID = 'openmaptiles';
const MAP_TILEJSON_URL = 'https://tiles.openfreemap.org/planet';
const MAP_STYLE_URL = null;

const GRANADA_COORDINATES = [-3.5986, 37.1773];
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const MAP_CAMERA = {
    start: {
        center: [10.2, 50.5],
        zoom: 4.15,
        pitch: 0,
        bearing: 0,
    },
    mid: {
        center: GRANADA_COORDINATES,
        zoom: 5.8,
        pitch: 0,
        bearing: 0,
    },
    end: {
        center: GRANADA_COORDINATES,
        zoom: 13,
        pitch: 0,
        bearing: 0,
    },
};

const MAP_PALETTE = {
    background: '#101820',
    earth: '#101828',
    waterLow: '#081020',
    waterMid: '#081020',
    waterHigh: '#101820',
    accent: '#d0b050',
    accentMuted: '#c89838',
    roadCasing: '#101820',
    boundary: '#a0b8d0',
};

document.addEventListener('DOMContentLoaded', () => {
    unregisterOldServiceWorkers();
    initMapScrollBackground();
    initSmoothAnchors();
});

function createMapStyle() {
    if (MAP_STYLE_URL) {
        return MAP_STYLE_URL;
    }

    return {
        version: 8,
        sources: {
            [MAP_SOURCE_ID]: {
                type: 'vector',
                url: MAP_TILEJSON_URL,
                attribution:
                    '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> <a href="https://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
            },
        },
        glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
        layers: [
            {
                id: 'background',
                type: 'background',
                paint: {
                    'background-color': MAP_PALETTE.background,
                },
            },
            {
                id: 'landcover-muted',
                type: 'fill',
                source: MAP_SOURCE_ID,
                'source-layer': 'landcover',
                filter: ['match', ['get', 'class'], ['wood', 'grass', 'scrub'], true, false],
                paint: {
                    'fill-color': MAP_PALETTE.earth,
                    'fill-opacity': ['interpolate', ['linear'], ['zoom'], 3, 0.05, 8, 0.12, 13, 0.18],
                },
            },
            {
                id: 'parks-muted',
                type: 'fill',
                source: MAP_SOURCE_ID,
                'source-layer': 'park',
                minzoom: 4,
                paint: {
                    'fill-color': MAP_PALETTE.accentMuted,
                    'fill-opacity': ['interpolate', ['linear'], ['zoom'], 4, 0.015, 10, 0.035, 14, 0.055],
                },
            },
            {
                id: 'landuse-outline',
                type: 'line',
                source: MAP_SOURCE_ID,
                'source-layer': 'landuse',
                minzoom: 3,
                paint: {
                    'line-color': MAP_PALETTE.accentMuted,
                    'line-opacity': ['interpolate', ['linear'], ['zoom'], 3, 0.01, 6, 0.03, 8, 0.05, 12, 0.06],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 3, 0.2, 6, 0.32, 8, 0.4, 12, 0.6],
                },
            },
            {
                id: 'landcover-outline',
                type: 'line',
                source: MAP_SOURCE_ID,
                'source-layer': 'landcover',
                minzoom: 3,
                paint: {
                    'line-color': MAP_PALETTE.boundary,
                    'line-opacity': ['interpolate', ['linear'], ['zoom'], 3, 0.015, 7, 0.04, 12, 0.05],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 3, 0.22, 7, 0.35, 12, 0.55],
                    'line-dasharray': [1.2, 2.2],
                },
            },
            {
                id: 'water',
                type: 'fill',
                source: MAP_SOURCE_ID,
                'source-layer': 'water',
                filter: ['match', ['get', 'brunnel'], ['tunnel'], false, true],
                paint: {
                    'fill-color': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        3,
                        MAP_PALETTE.waterLow,
                        7,
                        MAP_PALETTE.waterMid,
                        11,
                        MAP_PALETTE.waterHigh,
                    ],
                    'fill-opacity': 0.98,
                },
            },
            {
                id: 'waterways',
                type: 'line',
                source: MAP_SOURCE_ID,
                'source-layer': 'waterway',
                minzoom: 7,
                paint: {
                    'line-color': MAP_PALETTE.waterHigh,
                    'line-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0.16, 11, 0.26, 14, 0.34],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 7, 0.35, 11, 0.75, 14, 1.4],
                },
            },
            {
                id: 'water-outline',
                type: 'line',
                source: MAP_SOURCE_ID,
                'source-layer': 'water',
                filter: ['match', ['get', 'brunnel'], ['tunnel'], false, true],
                paint: {
                    'line-color': MAP_PALETTE.roadCasing,
                    'line-opacity': ['interpolate', ['linear'], ['zoom'], 3, 0.15, 7, 0.22, 12, 0.28],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 3, 0.35, 7, 0.55, 12, 0.85],
                },
            },
            {
                id: 'boundaries-country',
                type: 'line',
                source: MAP_SOURCE_ID,
                'source-layer': 'boundary',
                filter: ['all', ['==', ['get', 'admin_level'], 2], ['!=', ['get', 'maritime'], 1]],
                paint: {
                    'line-color': MAP_PALETTE.boundary,
                    'line-opacity': ['interpolate', ['linear'], ['zoom'], 3, 0.18, 6, 0.3, 10, 0.38, 14, 0.32],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 3, 0.45, 6, 0.75, 10, 1.2, 14, 0.95],
                },
            },
            {
                id: 'boundaries-subtle',
                type: 'line',
                source: MAP_SOURCE_ID,
                'source-layer': 'boundary',
                filter: [
                    'all',
                    ['>=', ['get', 'admin_level'], 3],
                    ['<=', ['get', 'admin_level'], 6],
                    ['!=', ['get', 'maritime'], 1],
                ],
                minzoom: 3.5,
                paint: {
                    'line-color': MAP_PALETTE.boundary,
                    'line-opacity': ['interpolate', ['linear'], ['zoom'], 3.5, 0.03, 6, 0.1, 7, 0.14, 11, 0.18, 14, 0.14],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 3.5, 0.2, 6, 0.32, 7, 0.4, 11, 0.65, 14, 0.55],
                    'line-dasharray': [3.2, 2.2],
                },
            },
            {
                id: 'major-roads-casing',
                type: 'line',
                source: MAP_SOURCE_ID,
                'source-layer': 'transportation',
                filter: [
                    'all',
                    ['match', ['get', 'class'], ['motorway', 'trunk', 'primary', 'secondary', 'tertiary'], true, false],
                    ['match', ['get', 'brunnel'], ['tunnel'], false, true],
                ],
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round',
                },
                paint: {
                    'line-color': MAP_PALETTE.roadCasing,
                    'line-opacity': ['interpolate', ['linear'], ['zoom'], 3, 0.52, 6, 0.62, 9, 0.7, 13, 0.8],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 3, 0.65, 6, 0.9, 9, 1.55, 12, 2.55, 14, 5],
                    'line-blur': 0.1,
                },
            },
            {
                id: 'major-roads',
                type: 'line',
                source: MAP_SOURCE_ID,
                'source-layer': 'transportation',
                filter: [
                    'all',
                    ['match', ['get', 'class'], ['motorway', 'trunk', 'primary', 'secondary', 'tertiary'], true, false],
                    ['match', ['get', 'brunnel'], ['tunnel'], false, true],
                ],
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round',
                },
                paint: {
                    'line-color': MAP_PALETTE.accent,
                    'line-opacity': ['interpolate', ['linear'], ['zoom'], 3, 0.55, 6, 0.7, 9, 0.8, 13, 0.9],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 3, 0.38, 6, 0.62, 9, 1.1, 12, 1.95, 14, 3.4],
                    'line-blur': ['interpolate', ['linear'], ['zoom'], 3, 0.08, 9, 0.02, 13, 0],
                },
            },
            {
                id: 'minor-roads-casing',
                type: 'line',
                source: MAP_SOURCE_ID,
                'source-layer': 'transportation',
                filter: [
                    'all',
                    ['match', ['get', 'class'], ['minor', 'service', 'track'], true, false],
                    ['match', ['get', 'brunnel'], ['tunnel'], false, true],
                ],
                minzoom: 9,
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round',
                },
                paint: {
                    'line-color': MAP_PALETTE.roadCasing,
                    'line-opacity': ['interpolate', ['linear'], ['zoom'], 9, 0.18, 11, 0.38, 13, 0.56, 14, 0.62],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 9, 0.38, 11, 0.62, 13, 1.4, 14, 2.5],
                    'line-blur': 0.08,
                },
            },
            {
                id: 'minor-roads',
                type: 'line',
                source: MAP_SOURCE_ID,
                'source-layer': 'transportation',
                filter: [
                    'all',
                    ['match', ['get', 'class'], ['minor', 'service', 'track'], true, false],
                    ['match', ['get', 'brunnel'], ['tunnel'], false, true],
                ],
                minzoom: 9,
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round',
                },
                paint: {
                    'line-color': MAP_PALETTE.accentMuted,
                    'line-opacity': ['interpolate', ['linear'], ['zoom'], 9, 0.12, 11, 0.32, 13, 0.55, 14, 0.66],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 9, 0.22, 11, 0.38, 13, 0.9, 14, 1.55],
                    'line-dasharray': [1.8, 1.2],
                    'line-blur': ['interpolate', ['linear'], ['zoom'], 9, 0.12, 11, 0.03, 13, 0],
                },
            },
            {
                id: 'paths',
                type: 'line',
                source: MAP_SOURCE_ID,
                'source-layer': 'transportation',
                filter: [
                    'all',
                    ['match', ['get', 'class'], ['path', 'pedestrian'], true, false],
                    ['match', ['get', 'brunnel'], ['tunnel'], false, true],
                ],
                minzoom: 12.5,
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round',
                },
                paint: {
                    'line-color': MAP_PALETTE.accentMuted,
                    'line-opacity': ['interpolate', ['linear'], ['zoom'], 12.5, 0.16, 14, 0.38],
                    'line-width': ['interpolate', ['linear'], ['zoom'], 12.5, 0.35, 14, 0.9],
                    'line-dasharray': [1, 1.6],
                },
            },
            {
                id: 'buildings',
                type: 'fill',
                source: MAP_SOURCE_ID,
                'source-layer': 'building',
                minzoom: 13,
                paint: {
                    'fill-color': MAP_PALETTE.roadCasing,
                    'fill-opacity': 0.34,
                },
            },
        ],
    };
}

function initMapScrollBackground() {
    const container = document.getElementById('map-background');
    if (!container || !window.maplibregl) {
        showMapNotice('MapLibre no se ha podido cargar. Revisa la conexion al CDN.');
        return;
    }

    if (typeof window.__portfolioMapCleanup === 'function') {
        window.__portfolioMapCleanup();
    }

    const map = new maplibregl.Map({
        container,
        style: createMapStyle(),
        center: MAP_CAMERA.start.center,
        zoom: MAP_CAMERA.start.zoom,
        pitch: MAP_CAMERA.start.pitch,
        bearing: MAP_CAMERA.start.bearing,
        attributionControl: false,
        interactive: false,
        dragPan: false,
        scrollZoom: false,
        boxZoom: false,
        dragRotate: false,
        keyboard: false,
        doubleClickZoom: false,
        touchZoomRotate: false,
        renderWorldCopies: true,
        fadeDuration: 0,
        canvasContextAttributes: {
            antialias: true,
        },
    });

    window.__portfolioMap = map;
    window.__portfolioMapConfig = { MAP_CAMERA, MAP_STYLE_URL, MAP_TILEJSON_URL, GRANADA_COORDINATES };

    disableMapInteractions(map);

    let frameId = null;
    let revealFallbackTimer = null;
    let revealLoadTimer = null;
    const motionQuery = typeof window.matchMedia === 'function'
        ? window.matchMedia(REDUCED_MOTION_QUERY)
        : null;
    const prefersReducedMotion = () => Boolean(motionQuery?.matches);

    const requestCameraUpdate = () => {
        if (frameId !== null) return;

        frameId = window.requestAnimationFrame(() => {
            frameId = null;
            updateMapCamera(map, prefersReducedMotion());
        });
    };

    let hasRevealedMap = false;
    let isCleanedUp = false;

    const revealMap = () => {
        if (hasRevealedMap) return;

        hasRevealedMap = true;
        window.clearTimeout(revealFallbackTimer);
        window.clearTimeout(revealLoadTimer);
        document.body.classList.add('map-ready');
        container.classList.remove('opacity-0');
        updateMapCamera(map, prefersReducedMotion());
    };

    const handleLoad = () => {
        map.resize();
        requestCameraUpdate();
        revealLoadTimer = window.setTimeout(revealMap, 300);
    };

    const handleResize = () => {
        map.resize();
        requestCameraUpdate();
    };

    const handleMapError = (event) => {
        if (event?.error) {
            console.warn('MapLibre error:', event.error);
        }
    };

    const handleMotionPreferenceChange = () => {
        requestCameraUpdate();
    };

    const handlePageHide = (event) => {
        if (!event.persisted) {
            cleanup();
        }
    };

    const cleanup = () => {
        if (isCleanedUp) return;
        isCleanedUp = true;

        window.removeEventListener('scroll', requestCameraUpdate);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('pagehide', handlePageHide);

        if (motionQuery && typeof motionQuery.removeEventListener === 'function') {
            motionQuery.removeEventListener('change', handleMotionPreferenceChange);
        } else if (motionQuery && typeof motionQuery.removeListener === 'function') {
            motionQuery.removeListener(handleMotionPreferenceChange);
        }

        if (frameId !== null) {
            window.cancelAnimationFrame(frameId);
            frameId = null;
        }

        window.clearTimeout(revealFallbackTimer);
        window.clearTimeout(revealLoadTimer);
        map.off('load', handleLoad);
        map.off('idle', revealMap);
        map.off('error', handleMapError);

        map.remove();

        if (window.__portfolioMap === map) {
            delete window.__portfolioMap;
        }

        if (window.__portfolioMapCleanup === cleanup) {
            delete window.__portfolioMapCleanup;
        }
    };

    window.__portfolioMapCleanup = cleanup;

    map.on('load', handleLoad);
    map.once('idle', revealMap);
    map.on('error', handleMapError);

    window.addEventListener('scroll', requestCameraUpdate, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pagehide', handlePageHide);

    if (motionQuery && typeof motionQuery.addEventListener === 'function') {
        motionQuery.addEventListener('change', handleMotionPreferenceChange);
    } else if (motionQuery && typeof motionQuery.addListener === 'function') {
        motionQuery.addListener(handleMotionPreferenceChange);
    }

    revealFallbackTimer = window.setTimeout(revealMap, 3200);
    requestCameraUpdate();
}

function disableMapInteractions(map) {
    [
        'scrollZoom',
        'dragPan',
        'dragRotate',
        'doubleClickZoom',
        'touchZoomRotate',
        'keyboard',
        'boxZoom',
    ].forEach((handlerName) => {
        const handler = map[handlerName];
        if (handler && typeof handler.disable === 'function') {
            handler.disable();
        }
    });
}

function updateMapCamera(map, reducedMotion = false) {
    const progress = reducedMotion ? 1 : getScrollProgress();
    const camera = getCameraForProgress(progress);

    map.jumpTo(camera);
}

function getCameraForProgress(progress) {
    const firstLegEnd = 0.35;

    if (progress <= firstLegEnd) {
        const eased = easeInOutCubic(progress / firstLegEnd);
        return interpolateCamera(MAP_CAMERA.start, MAP_CAMERA.mid, eased);
    }

    const eased = easeInOutCubic((progress - firstLegEnd) / (1 - firstLegEnd));
    return interpolateCamera(MAP_CAMERA.mid, MAP_CAMERA.end, eased);
}

function interpolateCamera(start, end, progress) {
    return {
        center: interpolatePosition(start.center, end.center, progress),
        zoom: interpolate(start.zoom, end.zoom, progress),
        pitch: interpolate(start.pitch, end.pitch, progress),
        bearing: interpolate(start.bearing, end.bearing, progress),
    };
}

function getScrollProgress() {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    return clamp(window.scrollY / scrollable, 0, 1);
}

function interpolatePosition(start, end, progress) {
    return [
        interpolate(start[0], end[0], progress),
        interpolate(start[1], end[1], progress),
    ];
}

function interpolate(start, end, progress) {
    return start + (end - start) * progress;
}

function easeInOutCubic(value) {
    return value < 0.5
        ? 4 * value * value * value
        : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;

            event.preventDefault();
            const behavior = userPrefersReducedMotion() ? 'auto' : 'smooth';
            target.scrollIntoView({ behavior, block: 'start' });
        });
    });
}

function userPrefersReducedMotion() {
    return typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function unregisterOldServiceWorkers() {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => registrations.forEach((registration) => registration.unregister()))
        .catch(() => {});
}

function showMapNotice(message) {
    document.body.classList.add('map-ready');

    const existingNotice = document.querySelector('.map-error');
    if (existingNotice) {
        existingNotice.textContent = message;
        return;
    }

    const notice = document.createElement('div');
    notice.className = 'map-error';
    notice.textContent = message;
    document.body.appendChild(notice);
}
