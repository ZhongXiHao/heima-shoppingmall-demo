// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      /* Standard viewport width for design drafts(iPhone x)
       Adjust according to blueprint needs, 750 => 375, 640 => 320 */
      viewportWidth: 375
    }
  }
}
