const ui = {
	sidebar: {
		toggle: () => {
			var element = document.getElementById("content");
			if (element) {
				element.classList.toggle("open");
			}
		},
		open: () => {
			var element = document.getElementById("content");
			if (element) {
				element.classList.add("open");
			}
		},
		close: () => {
			var element = document.getElementById("content");
			if (element) {
				element.classList.remove("open");
			}
		},
	},	main_sidebar: {
		toggle: () => {
			var element = document.getElementById("main-sidebar");
			if (element) {
				element.classList.toggle("show");
			}
			var toggler = document.getElementById("main-sidebar-toggler");
			if (toggler) {
				toggler.classList.toggle("show");
			}
		},
		open: () => {
			var element = document.getElementById("main-sidebar");
			if (element) {
				element.classList.add("show");
			}
					var toggler = document.getElementById("main-sidebar-toggler");
			if (toggler) {
				toggler.classList.add("show");
			}
		},
		close: () => {
			var element = document.getElementById("main-sidebar");
			if (element) {
				element.classList.remove("show");
			}
				var toggler = document.getElementById("main-sidebar-toggler");
			if (toggler) {
				toggler.classList.remove("show");
			}
		},
	},
	
	menuMobile: {
		toggle: () => {
			var element = document.getElementById("sidebar-menu");
			if (element) {
				element.classList.toggle("open-mobile");
			}
	
		},
		open: () => {
			var element = document.getElementById("sidebar-menu");
			if (element) {
				element.classList.add("open-mobile");
			}
		},
		close: () => {
			var element = document.getElementById("sidebar-menu");
			if (element) {
				element.classList.remove("open-mobile");
			}
		},
	},
	
	darkModeToggle: () => {
		var body = document.getElementsByTagName("body")[0];
		return body.classList.toggle("light");
	},
	
	setDarkMode: (enabled = true) => {
		var body = document.getElementsByTagName("body")[0];
		if(!enabled) {
			body.classList.add("light");
		} else {
			body.classList.remove("light");
		}
	}
};

// vedere se è possibile portare questo spinner dentro ui
const spinner = {
	show: () => {
		document.getElementById("spinner").style.display = "";
	},
	hide: () => {
		document.getElementById("spinner").style.display = "none";
	},
	setLang: (lang) => {
		
		document.getElementById("spinner").style.display = "";
		try {
			switch(((lang && typeof lang === 'string') || navigator.language).substring(0,2)) {
				case "en":
					document.getElementById("spinner").getElementsByClassName("wait")[0].innerHTML = " Please wait... ";
					break;
				case "it":
					document.getElementById("spinner").getElementsByClassName("wait")[0].innerHTML = " Attendere... ";
					break;
				default:
					break;
			}
			} catch (error) {
				
			}
		document.getElementById("spinner").style.display = "none";
	}
};
