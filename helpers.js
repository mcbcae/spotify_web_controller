function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function stripTags(text) {
	var tmp = document.createElement("div");
	tmp.innerHTML = text;
	return tmp.textContent || tmp.innerText;
}

function getCookie(name) {
	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value != null) ? unescape(value[1]) : null;
}

function setCookie(name, value) {
	var date = new Date();
	date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year
	document.cookie = name + " = " + value + "; expires=" + date.toUTCString() + "; path=/";
}

function formatSeconds(seconds) {
	var s = Math.floor(seconds % 60);
	var m = Math.floor((seconds / 60) % 60);
	var u = Math.floor(((seconds / 60) / 60) % 60);
	if (u > 0 && m < 10) {
		m = '0' + m;
	}
	if (s < 10) {
		s = '0' + s;
	}
	if (u < 1) {
		return (m + ':' + s);
	}
	else if (u >= 1) {
		return (u + ':' + m + ':' + s);
	}
}

function getDeviceIcon(type) {
	switch (type) {
		case "smartphone":
			return "&#xe32c;";
		case "computer":
			return "&#xe30a;";
		case "speaker":
		case "avr":
			return "&#xe32d;";
		case "tv":
		case "stb":
			return "&#xe333;"
		case "gameconsole":
			return "&#xe30f;";
		case "castvideo":
		case "castaudio":
			return "&#xe307;";
		case "automobile":
			return "&#xe531;";
		case "audiodongle":
			return "&#xe60f;";
		case "unknown":
		default:
			return "&#xe337;";
	}
}

function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value >>> amount) | (value << (32 - amount));
	}

	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty] * 8;

	//* caching results is optional - remove/add slash from front of this line to toggle
	//0x80000000 | //*
	var hash = sha256.h = sha256.h || []; // //*
	//0x80000000 | //*
	var k = sha256.k = sha256.k || []; // //*
	var primeCounter = k[lengthProperty]; // //*
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
			k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
		}
	}

	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty] % 64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j >> 8) return; // ASCII check: only support characters > 255
		words[i >> 2] |= j << ((3 - i) % 4) * 8;
	}
	words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
	words[words[lengthProperty]] = (asciiBitLength)

	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16);
		var oldHash = hash;
		// This is now the "working hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise the recursion makes 'hash' grow without bound)
		hash = hash.slice(0, 8);

		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if 
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e & hash[5]) ^ ((~e) & hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
					w[i - 16]
					+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) // s0
					+ w[i - 7]
					+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) // s1
				) | 0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

			hash = [(temp1 + temp2) | 0].concat(hash); // We don't worry about the first bit, it is always zero for 32-bits!
			hash[4] = (hash[4] + temp1) | 0;
		}

		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i]) | 0;
		}
	}

	// Convert result to byte array
	var byteArray = [];
	for (i = 0; i < 8; i++) {
		for (j = 3; j >= 0; j--) {
			var b = (hash[i] >> (j * 8)) & 255;
			byteArray.push(b);
		}
	}
	return byteArray;
}