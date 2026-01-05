import CustomProjectForm from './CustomProjectForm'
import styles from './page.module.css'

export const metadata = {
    title: 'Request Custom Project',
    description: 'Request a custom project tailored to your needs',
}

export default function CustomProjectPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Request a Custom Project</h1>
                    <p className={styles.subtitle}>
                        Tell us about your project requirements and we'll create something amazing for you
                    </p>
                </div>

                <CustomProjectForm />

                <div className={styles.info}>
                    <div className={styles.infoCard}>
                        <span className={styles.infoIcon}>⚡</span>
                        <h3>Fast Turnaround</h3>
                        <p>Most custom projects delivered within 7-14 days</p>
                    </div>
                    <div className={styles.infoCard}>
                        <span className={styles.infoIcon}>💎</span>
                        <h3>Premium Quality</h3>
                        <p>Professional code and design standards</p>
                    </div>
                    <div className={styles.infoCard}>
                        <span className={styles.infoIcon}>🔧</span>
                        <h3>Flexible Options</h3>
                        <p>Customizable features to match your needs</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
