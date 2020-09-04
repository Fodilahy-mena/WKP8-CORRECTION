let songs = [
    {
        id: 1599138491348,
        title: '400 Volt',
        artist: 'Wawa',
        style: 'Salegy',
        length: '4:00',
        picture: 'https://alchetron.com/cdn/wawa-malagasy-musician-02c48728-1e61-4ff1-b775-0b26fc275b5-resize-750.jpeg',
    },
    {
        id: 1599138512684,
        title: 'Tsy hirenireny',
        artist: 'Jaojaoby',
        style: 'Salegy',
        length: '2:25',
        picture: 'https://3.bp.blogspot.com/-kJw6dGFaobE/T99j8DoZq_I/AAAAAAAAB58/3OIaZviJxJA/s1600/jaojoby1.jpg',
    },
];

const songsList = document.querySelector('.song-list-container');
const addSongForm = document.querySelector('.add-songs');
const filterTitleInput = document.querySelector('#filter-title');
const filterStyleInput = document.querySelector('#filter-style');
const filterForm = document.querySelector('.filter-songs');
const resetFiltersBtn = document.querySelector('.reset-filters');

const filterList = e => {
    showSongs(e, filterTitleInput.value, filterStyleInput.value);
};

const resetFilters = e => {
    filterForm.reset();
    showSongs();
};

resetFiltersBtn.addEventListener('click', resetFilters);
filterTitleInput.addEventListener('keyup', filterList);
filterStyleInput.addEventListener('change', filterList);


const showSongs = (event, filterTitle, filterStyle) => {
    let sortedSongs = songs.sort((song1, song2) => song2.score - song1.score);
    let filteredSongs = [];
    if(filterTitle) {
        filteredSongs = songs.filter(song => {
            let lowerCaseTitle = song.title.toLowerCase();
            let lowerCaseFilter = filterTitle.toLowerCase();
            if(lowerCaseTitle.includes(lowerCaseFilter)) {
                return true;
            } else {
                return false;
            }
        });
    }
    if(filterStyle) {
        sortedSongs = sortedSongs.filter(song = song.style === filterStyle);
    }

    const html = sortedSongs
    .map(
        song => `
        <article class="song">
            <section>
                <img src="${song.picture}" alt="${song.title}"/>
            </section>
            <section>
                <h5>${song.title}</h5>
                <p>${song.style}</p>
            </section>
            <section>
                <h5>${song.artist}</h5>
                <p>${song.length}</p>
            </section>
            <section>
                SCORE: ${song.score}
            </section>
            <section>
                <button 
                class="increment-score" data-id="${song.title}">+1
                </button>
                <button class="delete" data-id="${song.id}">
                    <img src="./assets/icons/trash.svg" alt="Delete Song" />
                </button>
            </section>
        </article>
        `).join('');
    console.log(html);
    songsList.innerHTML = html;
};

showSongs();

const addSong = e => {
    e.preventDefault();
    const form = e.target;
    const newSong = {
        title: form.title.value,
        artist: form.artist.value,
        style: form.style.value,
        length: form.length.value,
        picture: form.picture.value,
        id: Date.now(),
        score: 0,
    }
    songs.push(newSong);
    songsList.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
};

// event delegation for update and delete song buttons
const handleClick = e => {
    if(e.target.closest('button.increment-score')) {
        const button = e.target;
        const id = button.dataset.id;
        updateSong(Number(id));
    }
    if(e.target.closest('button.delete')) {
        const button = e.target.closest('button.delete');
        const id = button.dataset.id;
        deleteSong(Number(id));
    }
};

const updateSong = idFromTheButton => {
    const song = songs.find(song => song.id === idFromTheButton);
    song.score++;
    songsList.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
    console.log();
};

const deleteSong = idToDelete => {
    songs = songs.filter(song => song.id === idToDelete);
    console.log(songs);
    songsList.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
};

// when we reload, we want to look inside the local storage and put them into songs
const initLocalStorage = () => {
    const stringFromLs = localStorage.getItem('songs');
    const lsItems = JSON.parse(stringFromLs);
    console.log(lsItems);
    if(lsItems) {
        songs = lsItems;
    } else {
        songs = [];
    }
    songsList.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
};

// we want to update the local storage each time we update, delete or add an attirbute
const updateLocalStorage = () => {};

addSongForm.addEventListener('submit', addSong);
songsList.addEventListener('pleaseUpdateTheList', showSongs);
songsList.addEventListener('pleaseUpdateTheList', updateLocalStorage);
songsList.addEventListener('click', handleClick);

// initLocalStorage();
