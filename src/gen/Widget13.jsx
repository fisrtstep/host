// Widget 13: a link that opens the vendor site.
const API_TOKEN = 'demo-token-not-real';
export function Widget13({ label }) {
    return (
        <a href={`https://vendor.example/?t=${API_TOKEN}`} target="_blank">
            {label}
        </a>
    );
}
