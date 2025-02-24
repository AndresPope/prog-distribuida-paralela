package Server;

import Implement.SalariesImplementation;

import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class SalariesServer {
    public static void main(String[] args) throws RemoteException {
        Registry reg = LocateRegistry.createRegistry(1099);
        SalariesImplementation salariesImpl = new SalariesImplementation();

        reg.rebind("Salaries", salariesImpl);
        System.out.println("Server is running...");
    }
}
