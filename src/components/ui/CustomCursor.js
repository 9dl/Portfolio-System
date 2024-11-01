import AnimatedCursor from "react-animated-cursor";
export default function CustomCursor({ cursorType }) {
    const renderCursor = (cursor) => {
        switch (cursor.toUpperCase()) {
            case 'DEFAULT':
                return (
                    <AnimatedCursor
                        innerSize={15}
                        outerSize={15}
                        color="2, 150, 254"
                        outerAlpha={0.4}
                        innerScale={0.7}
                        outerScale={5}
                    />
                );
            case 'DONUT':
                return (
                    <AnimatedCursor
                        innerSize={8}
                        outerSize={35}
                        innerScale={1}
                        outerScale={2}
                        outerAlpha={0}
                        hasBlendMode={true}
                        innerStyle={{
                            backgroundColor: 'var(--cursor-color)'
                        }}
                        outerStyle={{
                            border: '3px solid var(--cursor-color)'
                        }}
                    />
                );
            default:
                return <h2>Cursor not Found</h2>;
        }
    };

    return (
        <div>
            {renderCursor(cursorType)}
        </div>
    );
}
