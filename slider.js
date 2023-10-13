const presentation = document.querySelector(".presentation");
const sections = document.querySelectorAll(".chapter section");
const chapters = document.querySelectorAll(".chapter"); // Add this line to select chapter divs
const titles = document.querySelector("#titles");
const titleSpans = titles.querySelectorAll("span[id^='position']");
const chaptersCount = {};

const totalSections = sections.length;
let currentSection = 0;
let currentChapter = 0;
let introPosition = 0
let toolsPostion = 12


// Function to show the current section and hide the rest
function showSection(index, chapterIndex) {
  sections.forEach((section, i) => {
    if (i === index && chapterIndex === currentChapter) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

// Show the initial section
showSection(currentSection, currentChapter);

// Event listeners for the buttons
document.querySelector("#nextSlide").addEventListener("click", () => {
  if (currentSection < totalSections - 1) {
    currentSection++;
  } else {
    currentSection = 0;
  }
  showSection(currentSection, currentChapter);
});

document.querySelector("#previousSlide").addEventListener("click", () => {
  if (currentSection > 0) {
    currentSection--;
  } else {
    currentSection = totalSections - 1;
  }
  showSection(currentSection, currentChapter);
});

document.querySelector("#nextChapter").addEventListener("click", () => {
  if (currentChapter < chapters.length - 1) {
    currentChapter++;
    currentSection = 0; // Reset the section index
    showSection(currentSection, currentChapter);
    presentation.scrollLeft = chapters[currentChapter].offsetLeft;
  }
});

document.querySelector("#previousChapter").addEventListener("click", () => {
  if (currentChapter > 0) {
    currentChapter--;
    currentSection = 0; // Reset the section index
    showSection(currentSection, currentChapter);
    presentation.scrollLeft = chapters[currentChapter].offsetLeft;
  }
});

document.querySelector("#restart").addEventListener("click", () => {
  currentChapter = 0;
  currentSection = 0;
  showSection(currentSection, currentChapter);
  presentation.scrollLeft = 0; // Scroll back to the first chapter
});

function updateTitlesAndCount() {
  titleSpans.forEach((span) => {
    const id = span.id;
    const chapterName = id.replace("position", "").toLowerCase();
    const chapter = chapters[chapterName];
    const sectionCount = chapter.querySelectorAll("section").length;
    const currentPosition = chaptersCount[chapterName] || 1;
    
    span.textContent = `(${currentPosition}/${sectionCount})`;
    chaptersCount[chapterName] = currentPosition;
  });
}

// Event listeners for the buttons
document.querySelector("#nextChapter").addEventListener("click", () => {
  if (currentChapter < chapters.length - 1) {
    currentChapter++;
    scrollToChapter(currentChapter);
    updateTitlesAndCount();
  }
});

document.querySelector("#previousChapter").addEventListener("click", () => {
  if (currentChapter > 0) {
    currentChapter--;
    scrollToChapter(currentChapter);
    updateTitlesAndCount();
  }
});

// Initialize by scrolling to the first chapter and updating titles
scrollToChapter(currentChapter);
updateTitlesAndCount();
