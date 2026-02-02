/**
 * Tests for Vizio and Vidaa platform detection (isVizio, isVidaa).
 * Use these patterns to simulate Vizio/Vidaa in the browser or in other tests.
 */

import { isVizio } from '../../src/platforms/vizio.js';
import { isVidaa } from '../../src/platforms/vidaa.js';

const VIZIO_UA = 'Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.124 Safari/537.36 CrKey/1.0.999999 VIZIO SmartCast(Conjure/MTKC-108.710.14 FW/3.710.30.5-10 Model/D24f4-J01)';
const VIDAA_UA = 'Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Odin/88.4324.2.10 Safari/537.36 Model/Hisense-MT9602 VIDAA/5.0(Hisense;SmartTV;58A53FXVT;MTK9602)';
const DESKTOP_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// In Node (Jest) there may be no window; ensure modules see our mocks
const win = typeof window !== 'undefined' ? window : (global.window = global);
if (typeof navigator === 'undefined') {
  global.navigator = { userAgent: DESKTOP_UA };
}

function setUserAgent(ua) {
  Object.defineProperty(navigator, 'userAgent', { value: ua, configurable: true });
}

function setWindowProp(name, value) {
  if (value === undefined) {
    try { delete win[name]; } catch (_) {}
  } else {
    win[name] = value;
  }
}

describe('isVizio', () => {
  let origVIZIO, origUA;

  beforeEach(() => {
    origVIZIO = win.VIZIO;
    origUA = navigator.userAgent;
  });

  afterEach(() => {
    setWindowProp('VIZIO', origVIZIO);
    setUserAgent(origUA);
  });

  it('returns true when window.VIZIO is set', () => {
    setWindowProp('VIZIO', {});
    setUserAgent(DESKTOP_UA);
    expect(isVizio()).toBeTruthy();
  });

  it('returns true when UA contains VIZIO SmartCast', () => {
    setWindowProp('VIZIO', undefined);
    setUserAgent(VIZIO_UA);
    expect(isVizio()).toBe(true);
  });

  it('returns false when no global and desktop UA', () => {
    setWindowProp('VIZIO', undefined);
    setUserAgent(DESKTOP_UA);
    expect(isVizio()).toBe(false);
  });
});

describe('isVidaa', () => {
  let origVIDAA, origUA;

  beforeEach(() => {
    origVIDAA = win.VIDAA;
    origUA = navigator.userAgent;
  });

  afterEach(() => {
    setWindowProp('VIDAA', origVIDAA);
    setUserAgent(origUA);
  });

  it('returns true when window.VIDAA is set and UA suggests Vidaa', () => {
    setWindowProp('VIDAA', {});
    setUserAgent(VIDAA_UA);
    expect(isVidaa()).toBe(true);
  });

  it('returns true when UA has VIDAA and Hisense (no global)', () => {
    setWindowProp('VIDAA', undefined);
    setUserAgent(VIDAA_UA);
    expect(isVidaa()).toBe(true);
  });

  it('returns true when UA has VIDAA and Odin (no global)', () => {
    setWindowProp('VIDAA', undefined);
    setUserAgent('Mozilla/5.0 (X11; Linux armv7l) Chrome/88.0.4324.182 Odin/88.4324.2.10 Safari/537.36 Model/SomeModel VIDAA/6.0');
    expect(isVidaa()).toBe(true);
  });

  it('returns false when window.VIDAA is null', () => {
    setWindowProp('VIDAA', null);
    setUserAgent(VIDAA_UA);
    expect(isVidaa()).toBe(true); // UA still matches
    setUserAgent(DESKTOP_UA);
    expect(isVidaa()).toBe(false); // no global (null), no UA match
  });

  it('returns false when no global and desktop UA', () => {
    setWindowProp('VIDAA', undefined);
    setUserAgent(DESKTOP_UA);
    expect(isVidaa()).toBe(false);
  });
});
