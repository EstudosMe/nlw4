export function ExperienceBar() {
    return(
        <header className="experience-bar">
            <span>0 xp</span>
                <div>
                    <div style={{ width: '30%' }}></div>
                    <span className="currrent-experience" style={{ left: '30%' }}>
                        300xp
                    </span>
                </div>
            <span>600 px</span>
        </header>
    )
}