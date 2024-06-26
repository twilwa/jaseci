import useArchitypeList from "../src/hooks/useArtchitypeList";
import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { createTestQueryClient } from "../mocks/utils";
import { useGetMasterAllUsers } from "../src/hooks/useGetMasterAllUsers";
import { useGetDetailedObject } from "../src/hooks/useGetDetailedObject";

test("useGetMasterAllUsers hook", async () => {
  const wrapper = ({ children }) => (
    <QueryClientProvider client={createTestQueryClient()}>
      {children}
    </QueryClientProvider>
  );

  const { result } = renderHook(
    () => useGetMasterAllUsers({ search: "", limit: 10, offset: 0 }),
    {
      wrapper,
    }
  );

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.data.total).toBe(2);
});

test("useGetDetailedObject hook", async () => {
  const wrapper = ({ children }) => (
    <QueryClientProvider client={createTestQueryClient()}>
      {children}
    </QueryClientProvider>
  );

  const { result } = renderHook(() => useGetDetailedObject(), {
    wrapper,
  });

  const response = await result.current.mutateAsync("fakejid");

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });
});
