## BPlayer VHS (aka VHS)

Simple wrapper to make working with bloomberg bplayer a bit easier.

### Instructions

- First save the module to you project...

```
npm install --save bplayer-vhs
```

- Add it as a dependency in your app

```js
import VHS from 'bplayer-vhs'
```

- Then make sure you have a DIV in your body with an ID where you want the video to inject to.

```html
<div class="dvz-video" id="some-video"></div>
```

*(Note: feel free to style the div however you like, but please keep it relatively positioned. The injected video will stretch to fill the width of it's parent)*

- Now, instantiate the player passing in the ID of the div it will inject to + the ID of the video asset itself.


```js
const v = new VHS({
	domId: 'top-video',
	videoId: 'OD0g_99_xxxxxxxx',
});
```

- The above configuration will leave the player in it's default state. Below, we are specifiying a player with autoplay (defaults to false)

```js
const v = new VHS({
	domId: 'top-video',
	videoId: 'OD0g_99_xxxxxxxx',
	autoplay: true
});
```


- You also have access to all BPlayer methods such as play/pause/etc

```js
v.play();
v.pause();
```

