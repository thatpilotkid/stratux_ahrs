/* eslint-disable no-unused-vars */
/* global system, AHRS_TYPE, UNITS, SOURCE, COLORS, headingTape, speedTape, altTape, vspeedTape, ahrsTape, slipSkid, turnCoordinator, gMeter, satCount, conv */
// ============================================== //
// configuration.js :: Stratux AHRS

// Edit settings for each component of the AHRS and ADS-b traffic display.
// Descriptions of each setting are commented.
//
// View the repo at
// https://github.com/knicholson32/stratux_ahrs
//
// Run with via webserver. Entry point is
// 'index.html'
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// ============================================== //

/** ******************************** SYSTEM ******************************** **/
var system = {
  // Overall system settings
  overlay_active: true, // Enable warning overlay on startup
  ahrs: {
    // Settings for the overall AHRS
    updateTimeout: 1250, // Time (in ms) required for a metric to be set as invalid
    reloadAfterTimeoutCount: 4 // Number of times the timeout has to be hit before a reboot
  },
  fmu: {
    // Settings for the overall AHRS
    updateTimeout: 1500 // Time (in ms) required for a metric to be set as invalid
  },
  checkActiveTime: 2250,
  // Websocket URL for situation
  websocket_url: "ws://raspberrypi.local/situation",
  enable_ahrs_ws: true,
  enable_get_status: true,
  // Websocket URL for FMU Update
  fmu_url: "ws://raspberrypi.local:8888",
  enable_fmu: false, // Enable FMU support - in development
  cpu_temp_warn: 70, // Temp at which the 'Temp' banner will be displayed (C)
  allow_reload: true, // Allows the app to automatically reload if it detects an issue
  status_url: "http://raspberrypi.local/getStatus",
  push_url: "http://raspberrypi.local",
  simulate: false
};
/** ******************************** ****** ******************************** **/

/** ******************************* CONSTANTS ****************************** **/
var COLORS = {
  RED: 0,
  GREEN: 1,
  YELLOW: 2
};
var AHRS_TYPE = {
  SPEED: 0,
  ALT: 1,
  HDG: 2,
  AHRS: 3,
  VSPEED: 4,
  GMETER: 5,
  SLIPSKID: 6,
  ALL: 7
};
var UNITS = {
  KTS: 0,
  MPH: 1,
  MPS: 2,
  FPS: 3,
  FPM: 4,
  KPH: 5,
  MPM: 11,
  FEET: 6,
  METERS: 7,
  M: 7,
  MILES: 8,
  NAUTICLE_MILES: 9,
  INHG: 11,
  MILLIBAR: 12,
  MB: 12,
  HPA: 13
};
var SOURCE = {
  AHRS: 0,
  GPS: 1,
  BARO: 2,
  INPUT: 3,
  AUTO: 4
};
/** ******************************* ********* ****************************** **/

/** ******************************* HEADING ******************************** **/
var headingTape = {
  // Compass / track tape at the bottom of the AHRS
  range: 30, // Visual range of degrees present at one time. IE: a
  // value of '30' allows 30 degrees visiable at all times.
  ticks_per_number: 10 // Specifies how often numbers are written on the tape.
  // A val of '10' means every 10th number is shown
};
/** ******************************* ******* ******************************** **/

/** ******************************** SPEED ********************************* **/
var speedTape = {
  // Speed tape on the left of the AHRS
  lowerSpeed: 0, // Lower displayed speed given in the selected unit
  upperSpeed: 200, // Upper displayed speed given in the selected unit
  speeds: [
    // Speed color band configurations given in the selected unit
    {
      color: COLORS.WHITE,
      start: 40,
      end: 85
    },
    {
      color: COLORS.GREEN,
      start: 48,
      end: 129
    },
    {
      color: COLORS.YELLOW,
      start: 129,
      end: 163
    },
    {
      color: COLORS.RED,
      start: 162,
      end: 163
    }
  ],
  units: UNITS.KTS // Units for displaying speed and for speed config.
};
/** ******************************** ***** ********************************* **/

/** ******************************* ALTITUDE ******************************* **/
var altTape = {
  units: UNITS.FEET, // Units for displaying altitude
  altimeter_setting_unit: UNITS.INHG, // Units for entering altimeter settings (INHG, HPA or MILLIBAR)
  default_kollsman_inhg: 29.92, // Default kollsman setting for the baro altimeter (inHg)
  default_kollsman_millibar_hpa: 1013.2, // Default kollsman setting for the baro altimeter (millibar / hPa)
  kollsman_memory_seconds: 18000 // Number of seconds the kollsman setting will be remembered (cookie)
};
/** ******************************* ******** ******************************* **/

/** ******************************** VSPEED ******************************** **/
var vspeedTape = {
  units: UNITS.FPM, // Units for displaying vertical speed
  display: true
};
/** ******************************** ****** ******************************** **/

/** ********************************* AHRS ********************************* **/
var ahrsTape = {
  // AHRS in the center of the AHRS
  limits: [ 30, -30 ], // Limits for the degrees that are displayed. Values
  // outside this range show chevrons
  degrees_in_view: 50, // Degrees in constant view (range)
  chevrons: 4, // Number of chevrons shown passed the limits
  chevron_space: 140 // Space given to each chevron (sizing)
};
/** ********************************* AHRS ********************************* **/

/** ****************************** SLIP SKID ******************************* **/
var slipSkid = {
  multiplier: 6, // Arbitrary scale for tuning slip-skid movement
  display: true
};
/** ****************************** SLIP SKID ******************************* **/

/** *************************** TURN COORDINATOR *************************** **/
var turnCoordinator = {
  display: true
};
/** *************************** TURN COORDINATOR *************************** **/

/** ******************************** G-Meter ******************************* **/
var gMeter = {
  display: true
};
/** ******************************** ******* ******************************* **/

/** ****************************** Sat Count ******************************* **/
var satCount = {
  display: true
};
/** ****************************** ********* ******************************* **/

/** ********************************* ADS-b ******************************** **/
/** ********************************* ***** ******************************** **/

/** ******************************** CONSTS ******************************** **/
var conv = {
  ft2m: 0.3048,
  m2ft: 3.280839895,
  nmi2m: 1852,
  m2nmi: 0.0005399568035,
  mi2nmi: 0.868976,
  nmi2mi: 1.1507797684,
  m2km: 0.001,
  km2m: 1000,
  nmi2km: 1.852,
  km2nmi: 0.5399568035,
  mps2mph: 2.23694,
  mph2mps: 0.447039259,
  mps2kts: 1.94384,
  kts2mps: 0.5144456334,
  kts2mph: 1.15078,
  mph2kts: 0.8689758251,
  mps2fpm: 196.85,
  fpm2mps: 0.00508001016,
  mps2fps: 3.28084,
  fps2mps: 0.3047999902,
  mps2kph: 3.6,
  kph2mps: 0.2777777778,
  m2mi: 0.000621371,
  mi2m: 1609.3444978926,
  mps2mpm: 60,
  mpm2mps: 0.01666666667,
  hpa2inhg: 0.029529983071445
};
/** ******************************** ****** ******************************** **/

if ( typeof module !== "undefined" ) {
  module.exports = {
    system: system
  };
}
