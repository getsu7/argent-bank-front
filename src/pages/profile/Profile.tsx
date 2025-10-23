import './Profile.scss';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useState, useCallback, useMemo} from "react";
import {updateUserProfileAsync} from "../../store/user";

function Profile() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.user);
    const token = useAppSelector((state) => state.user.token);
    const status = useAppSelector((state) => state.user.status);
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [updateError, setUpdateError] = useState<string | null>(null);

    const handleEditClick = useCallback(() => {
        setFirstName(user?.firstName || '');
        setLastName(user?.lastName || '');
        setUpdateError(null);
        setIsEditing(true);
    }, [user?.firstName, user?.lastName]);

    const handleCancelClick = useCallback(() => {
        setIsEditing(false);
        setFirstName(user?.firstName || '');
        setLastName(user?.lastName || '');
        setUpdateError(null);
    }, [user?.firstName, user?.lastName]);

    const handleSaveClick = useCallback(async () => {
        if (token) {
            try {
                setUpdateError(null);
                await dispatch(updateUserProfileAsync({
                    token,
                    data: {
                        firstName: firstName.trim(),
                        lastName: lastName.trim()
                    }
                })).unwrap();
                setIsEditing(false);
            } catch (error) {
                console.error('Erreur lors de la mise à jour du profil:', error);
                setUpdateError(error instanceof Error ? error.message : 'Erreur lors de la mise à jour');
            }
        }
    }, [token, firstName, lastName, dispatch]);

    const isLoading = useMemo(() => status === 'loading', [status]);
    const isSaveDisabled = useMemo(() =>
            isLoading || !firstName.trim() || !lastName.trim(),
        [isLoading, firstName, lastName]
    );

    const accounts = useMemo(() => [
        {
            title: "Argent Bank Checking (x8349)",
            amount: "$2,082.79",
            description: "Available Balance"
        },
        {
            title: "Argent Bank Savings (x6712)",
            amount: "$10,928.42",
            description: "Available Balance"
        },
        {
            title: "Argent Bank Credit Card (x8349)",
            amount: "$184.30",
            description: "Current Balance"
        }
    ], []);

    return (
        <main className="main bg-dark">
            <div className="header">
                {isEditing ? (
                    <>
                        <h1>Welcome back</h1>
                        <div className="edit-form">
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                    disabled={isLoading}
                                />
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    disabled={isLoading}
                                />
                            </div>
                            {updateError && (
                                <div className="error-message" style={{color: 'red', marginTop: '10px'}}>
                                    {updateError}
                                </div>
                            )}
                            <div className="button-wrapper">
                                <button
                                    className="save-button"
                                    onClick={handleSaveClick}
                                    disabled={isSaveDisabled}
                                >
                                    {isLoading ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    className="cancel-button"
                                    onClick={handleCancelClick}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Welcome back<br/>{user?.firstName} {user?.lastName}!</h1>
                        <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
                    </>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            {accounts.map((account, index) => (
                <section className="account" key={index}>
                    <div className="account-content-wrapper">
                        <h3 className="account-title">{account.title}</h3>
                        <p className="account-amount">{account.amount}</p>
                        <p className="account-amount-description">{account.description}</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            ))}
        </main>
    )
}

export default Profile;