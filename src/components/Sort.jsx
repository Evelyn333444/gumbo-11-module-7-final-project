const sortedMovies = [...movies]; {
    if (sortType === 'NEW_TO_OLD') {
        sortedMovies.sort((a, b) => Number(b.Year) - Number(a.Year));
    } else if (sortType === 'OLD_TO_NEW') {
        sortedMovies.sort((a, b) => Number(a.Year) - Number(b.Year));
    }

    return (
         <div className="filter-container">
                <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                    <option value="">Sort by...</option>
                    <option value="NEW_TO_OLD">Newest to Oldest</option>
                    <option value="OLD_TO_NEW">Oldest to Newest</option>
                </select>
            </div>
    );
} 

export default Sort