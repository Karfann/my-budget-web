import { Account } from './../accounts/shared/account';

export const ACCOUNTS: Account[] = [
    new Account(1, "Bank of Ireland", 60.0, true),
    new Account(2, "AIB", 100.0, true),
    new Account(3, "Bank of Germany", 0.0, false),
    new Account(4, "N26", 15.0, true),
    new Account(5, "Ulster", 500.0, true)
]