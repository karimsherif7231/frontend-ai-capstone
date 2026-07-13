import SettingsForm from "@/components/SettingsForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("SettingsForm", () => {
  it("renders labeled fields", () => {
    render(<SettingsForm />);

    expect(screen.getByLabelText(/^Full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save changes/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    render(<SettingsForm initialValues={{ fullName: "", email: "" }} />);

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText("Full name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Full name/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByLabelText(/^Email/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(
      <SettingsForm
        initialValues={{ fullName: "Jane Doe", email: "invalid-email" }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
      await screen.findByText("Please enter a valid email address."),
    ).toBeInTheDocument();
  });

  it("shows validation error for short password when provided", async () => {
    const user = userEvent.setup();
    render(
      <SettingsForm
        initialValues={{
          fullName: "Jane Doe",
          email: "jane@example.com",
          password: "short",
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
      await screen.findByText("Password must be at least 8 characters."),
    ).toBeInTheDocument();
  });

  it("clears field error when the user edits the input", async () => {
    const user = userEvent.setup();
    render(<SettingsForm initialValues={{ fullName: "", email: "" }} />);

    await user.click(screen.getByRole("button", { name: /save changes/i }));
    expect(await screen.findByText("Full name is required.")).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^Full name/i), "Jane");

    await waitFor(() => {
      expect(
        screen.queryByText("Full name is required."),
      ).not.toBeInTheDocument();
    });
    expect(screen.getByLabelText(/^Full name/i)).toHaveAttribute(
      "aria-invalid",
      "false",
    );
  });

  it("shows loading state during slow submission", async () => {
    const user = userEvent.setup();
    let resolveSubmit: (() => void) | undefined;

    render(
      <SettingsForm
        initialValues={{
          fullName: "Jane Doe",
          email: "jane@example.com",
        }}
        onSubmit={() =>
          new Promise<void>((resolve) => {
            resolveSubmit = resolve;
          })
        }
      />,
    );

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();
    expect(screen.getByLabelText(/^Full name/i)).toBeDisabled();
    expect(screen.getByLabelText(/^Email/i)).toBeDisabled();
    expect(screen.getByLabelText(/^Password/i)).toBeDisabled();

    resolveSubmit?.();

    expect(
      await screen.findByText("Settings saved successfully."),
    ).toHaveAttribute("role", "status");
  });

  it("shows success feedback after successful submission", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <SettingsForm
        initialValues={{
          fullName: "Jane Doe",
          email: "jane@example.com",
        }}
        onSubmit={onSubmit}
      />,
    );

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText("Settings saved successfully.")).toHaveAttribute(
      "role",
      "status",
    );
    expect(onSubmit).toHaveBeenCalledWith({
      fullName: "Jane Doe",
      email: "jane@example.com",
      password: "",
    });
  });

  it("shows error feedback when submission fails", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue(new Error("Network error"));

    render(
      <SettingsForm
        initialValues={{
          fullName: "Jane Doe",
          email: "jane@example.com",
        }}
        onSubmit={onSubmit}
      />,
    );

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
      await screen.findByText(
        "Something went wrong while saving your settings. Please try again.",
      ),
    ).toHaveAttribute("role", "alert");
    expect(
      screen.queryByText("Settings saved successfully."),
    ).not.toBeInTheDocument();
  });

  it("does not call onSubmit when validation fails", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <SettingsForm
        initialValues={{ fullName: "", email: "" }}
        onSubmit={onSubmit}
      />,
    );

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText("Full name is required.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
