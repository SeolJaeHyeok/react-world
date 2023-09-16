import Button from './button';
import styles from './test.module.scss';
function App() {
    return (
        <>
            <Button
                className={styles.font}
                width={120}
                height={40}
                size="large"
            >
                Sign in
            </Button>
        </>
    );
}

export default App;
