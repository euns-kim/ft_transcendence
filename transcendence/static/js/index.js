import ComponentLobbyRoom, { ComponentLobbyRoomJoinButton } from "./components/LobbyRoom.js";
import ComponentAvatar from "./components/Avatar.js";
import ComponentNavigationBar from "./components/NavigationBar.js";
import ComponentLogo from "./components/Logo.js";
import ComponentGameBoard from "./components/GameBoard.js";
import ComponentAIGameBoard from "./components/AIGameBoard.js";

import PageError from "./pages/PageError.js";
import PageLogin from "./pages/PageLogin.js";
import PageGame from "./pages/PageGame.js";
import PageAiGame from "./pages/PageAiGame.js";
import PageRoom from "./pages/PageRoom.js";
import PageMain from "./pages/PageMain.js";

import { myself } from "./myself.js";

const pageMapping = {
	error: PageError,
	login: PageLogin,
	game: PageGame,
	"ai-game": PageAiGame,
	room: PageRoom,
	main: PageMain
};

function main() {
	const contentContainer = document.getElementsByClassName("content-container")[0];
	let currentPage;
	window.addEventListener("hashchange", function(event) {
		currentPage.removeEvents();
		let pageClass = pageMapping[getPageHashFromURL(location)];
		if (!pageClass) {
			pageClass = pageMapping["error"];
		}
		currentPage = new pageClass(contentContainer);
		// TODO(Anthony): Authentication here. To ensure that user has been logged in
		renderTemplate(contentContainer, currentPage.templateId);
		currentPage.attachEvents();
	});
	// TODO(Anthony): Authentication here. To ensure that user has been logged in
	let pageClass = pageMapping[getPageHashFromURL(location)];
	if (!pageClass) {
		pageClass = pageMapping["error"];
	}
	currentPage = new pageClass(contentContainer);
	renderTemplate(contentContainer, currentPage.templateId);
	currentPage.attachEvents();
}

function getPageHashFromURL(url) {
	let hash = url.hash.slice(1);
	if (hash == '')
		hash = "main";
	return hash;
}

function renderTemplate(container, templateId) {
	let template = document.getElementById(templateId);
	if (template == null) {
		console.error("renderTemplate() attempts to access unknown template");
		template = document.getElementById("page-error");
	}
	const clone = template.content.cloneNode(true);
	// Note(HeiYiu): remove all DOM Elements in container
	while (container.firstElementChild) {
		container.removeChild(container.firstElementChild);
	}
	container.prepend(clone);
}

window.addEventListener("DOMContentLoaded", main);
window.customElements.define("td-lobby-room", ComponentLobbyRoom);
window.customElements.define("td-lobby-room-join-button", ComponentLobbyRoomJoinButton);
window.customElements.define("td-avatar", ComponentAvatar);
window.customElements.define("td-navigation-bar", ComponentNavigationBar);
window.customElements.define("td-logo", ComponentLogo);
window.customElements.define("td-game-board", ComponentGameBoard);
window.customElements.define("td-ai-game-board", ComponentAIGameBoard);
