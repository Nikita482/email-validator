import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import App from "./App";

describe("Валидация корректных email", () => {
  test("валидный email с латинскими буквами вызывает alert", async () => {
    window.alert = vi.fn();

    render(<App />);

    const input = screen.getByPlaceholderText("Введите email");
    const button = screen.getByRole("button", { name: /проверить/i });

    await userEvent.type(input, "test@gmail.com");
    await userEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Прекрасный email-адрес");
  });

  test("email с цифрами вызывает alert", async () => {
    window.alert = vi.fn();

    render(<App />);

    const input = screen.getByPlaceholderText("Введите email");
    const button = screen.getByRole("button", { name: /проверить/i });

    await userEvent.type(input, "test123@gmail.com");
    await userEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Прекрасный email-адрес");
  });

  test("Ввод email с допустимыми спецсимволами", async () => {
    window.alert = vi.fn();

    render(<App />);

    const input = screen.getByPlaceholderText("Введите email");
    const button = screen.getByRole("button", { name: /проверить/i });

    await userEvent.type(input, "test!#$%&'*+-/=?^_{|}~`@gmail.com");
    await userEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Прекрасный email-адрес");
  });

  test("валидный email показывает alert", async () => {
    window.alert = vi.fn();

    render(<App />);

    const input = screen.getByPlaceholderText("Введите email");
    const button = screen.getByRole("button", { name: /проверить/i });

    await userEvent.type(input, "test@gmail.com");
    await userEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Прекрасный email-адрес");
  });
});

describe("Валидация некорректных email", () => {
  test("Некорректный email с нелатинскими символами показывает ошибку", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Введите email");
    const button = screen.getByRole("button", { name: /проверить/i });

    await userEvent.type(input, "тест@пример");
    await userEvent.click(button);

    expect(screen.getByText("Введен некорректный email")).toBeInTheDocument();
  });

  test("Ввод email без символа «@» это ошибка", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Введите email");
    const button = screen.getByRole("button", { name: /проверить/i });

    await userEvent.type(input, "testgmail.com");
    await userEvent.click(button);

    expect(screen.getByText("Введен некорректный email")).toBeInTheDocument();
  });

  test("Ввод email без домена выдаст ошибку", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Введите email");
    const button = screen.getByRole("button", { name: /проверить/i });

    await userEvent.type(input, "test@");
    await userEvent.click(button);

    expect(screen.getByText("Введен некорректный email")).toBeInTheDocument();
  });

  test("Некорректный email показывает ошибку", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Введите email");
    const button = screen.getByRole("button", { name: /проверить/i });

    await userEvent.type(input, "тест@пример");
    await userEvent.click(button);

    expect(screen.getByText("Введен некорректный email")).toBeInTheDocument();
  });

  test("проверяет цвет ошибки", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Введите email");
    const button = screen.getByRole("button", { name: /проверить/i });

    await userEvent.type(input, "test@");
    await userEvent.click(button);

    expect(screen.getByText("Введен некорректный email")).toHaveStyle({
      color: "rgb(255, 0, 0)",
    });
  });
});

describe("Поведение в процессе ввода и валидации", () => {
  test("ошибка не появляется при вводе email", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Введите email");

    await userEvent.type(input, "invalid-email");

    expect(screen.queryByText("Введен некорректный email")).toBeNull();
  });

  test("валидация при нажатии на кнопку", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Введите email");
    const button = screen.getByRole("button", { name: /проверить/i });

    await userEvent.type(input, "invalid-email");
    await userEvent.click(button);

    expect(screen.getByText("Введен некорректный email")).toBeInTheDocument();
  });
});
