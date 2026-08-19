"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import * as accountService from "../services/accountService";
import * as addressesService from "../services/addressesService";
import { fetchMyOrders } from "../services/ordersService";
import type {
  AccountCustomer,
  AccountOrder,
  AccountTab,
  Address,
  AddressInput,
  CustomerUpdate,
} from "../types/account/account";

export function useAccount() {
  const router = useRouter();
  const { customer: authCustomer, loading: authLoading, logout: authLogout, refresh } = useAuth();

  const [customer, setCustomer] = useState<AccountCustomer | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<AccountOrder[]>([]);
  const [tab, setTab] = useState<AccountTab>("pedidos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!authCustomer) {
      router.push("/login?redirect=/minha-conta");
      return;
    }

    let cancelled = false;

    (async () => {
      const [profile, addrs, myOrders] = await Promise.all([
        accountService.fetchProfile(),
        addressesService.fetchAddresses(),
        fetchMyOrders(),
      ]);

      if (cancelled) return;
      setCustomer(profile);
      setAddresses(addrs);
      setOrders(myOrders);
      setLoading(false);
    })().catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [authLoading, authCustomer, router]);

  const logout = async () => {
    await authLogout();
    router.push("/");
    router.refresh();
  };

  const saveProfile = async (data: CustomerUpdate) => {
    const updated = await accountService.updateProfile(data);
    setCustomer(updated);
    await refresh();
  };

  const reloadAddresses = async () => {
    setAddresses(await addressesService.fetchAddresses());
  };

  const addAddress = async (input: AddressInput) => {
    await addressesService.createAddress(input);
    await reloadAddresses();
  };

  const editAddress = async (id: string, input: AddressInput) => {
    await addressesService.updateAddress(id, input);
    await reloadAddresses();
  };

  const removeAddress = async (id: string) => {
    await addressesService.deleteAddress(id);
    await reloadAddresses();
  };

  return {
    email: customer?.email ?? "",
    customer,
    addresses,
    orders,
    tab,
    setTab,
    loading,
    logout,
    saveProfile,
    addAddress,
    editAddress,
    removeAddress,
  };
}
