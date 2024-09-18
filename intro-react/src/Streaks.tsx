type Streakprops = {
    streak: number;
}

export default function Streaks(props: Streakprops) {

    return (
        <main>
            <h1>This is your streaks: {props.streak}</h1>
            <p>This is the secound page</p>
        </main>
    );
}