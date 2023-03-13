// TODO: Make some fields optional or remove interface all together?
interface Credential {
    name: string;
    url: string;
    username: string;
    password: string;
    note: string;
    icon: string;
}

export { type Credential };
