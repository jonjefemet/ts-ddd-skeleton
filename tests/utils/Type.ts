type TestCase<T> = {
    input: T;
    expected: unknown;
    description: string;
};

export { TestCase };