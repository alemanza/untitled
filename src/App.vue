<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/organisms/Header'

export default {
  components: {
    Header,
  }
}
</script>
<style lang="scss">
// Font
@import url('https://fonts.googleapis.com/css?family=Chivo:400,700');

// Icons
@import url('https://unpkg.com/ionicons@4.5.5/dist/css/ionicons.min.css');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video,
textarea, input, select {
	margin: 0;
	padding: 0;
	border: 0;
	font: inherit;
  font-family: 'Chivo', sans-serif;
	font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  background-color: #EADFC8;
}
ol, ul {
	list-style: none;
}
a {
  text-decoration: none;
}
</style>
