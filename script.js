let songs = [
    {
        id: 1599138491348,
        title: '400 Volt',
        artist: 'Wawa',
        style: 'Salegy',
        length: '4:00',
        pictures: 'https://alchetron.com/cdn/wawa-malagasy-musician-02c48728-1e61-4ff1-b775-0b26fc275b5-resize-750.jpeg',
    },
    {
        id: 1599138512684,
        title: 'Tsy hirenireny',
        artist: 'Jaojaoby',
        style: 'Salegy',
        length: '2:25',
        pictures: 'https://3.bp.blogspot.com/-kJw6dGFaobE/T99j8DoZq_I/AAAAAAAAB58/3OIaZviJxJA/s1600/jaojoby1.jpg',
    },
];

const songsList = document.querySelector('.song-list-container');
const addSongForm = document.querySelector('.add-songs');
const filterTitleInput = document.querySelector('#filter-title');
const filterStyleInput = document.querySelector('#filter-style');
const filterForm = document.querySelector('.filter-songs');
const resetFiltersBtn = document.querySelector('.reset-filters');

const filterList = e => {};

const resetFilters = e => {};

resetFiltersBtn.addEventListener('click', resetFilters);
filterTitleInput.addEventListener('keyup', filterList);
filterStyleInput.addEventListener('change', filterList);

const showSongs = (event, filterTitle, filterStyle) => {
    const html = songs.map(song => {
        `<article class="song">
            <section>
                <img src="./assets/artist.jpeg" alt="artist-picture" />
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
                <button class="increment-score" data-id="${song.id}">+1</button>
                <button class="delete" data-id="${song.id}">
                    <img src="${song.picture}" alt="Delete Song" />
                </button>
            </section>
        </article>`
    }).join('');
songsList.innerHTML = html;
};

const addSong = e => {
    e.preventDefault();
    const form = e.target;
    const newSong = {
        title: form.title.value,
        artist: form.artist.value,
        style: form.style.value,
        length: form.length.value,
        picture: form.picture.value,
        id: Date.nowe(),
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
    console.log();
};

const deleteSong = idToDelete => {};

// when we reload, we want to look inside the local storage and put them into songs
const initLocalStorage = () => {};

// we want to update the local storage each time we update, delete or add an attirbute
const updateLocalStorage = () => {};

addSongForm.addEventListener('submit', addSong);
songsList.addEventListener('pleaseUpdateTheList', showSongs);
songsList.addEventListener('pleaseUpdateTheList', updateLocalStorage);
songsList.addEventListener('click', handleClick);

initLocalStorage();
